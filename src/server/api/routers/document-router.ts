import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { ServicesDocument } from "~/data/service";
import { TRPCError } from "@trpc/server";
import { Status } from "@prisma/client";

const DocumentRouter = createTRPCRouter({
  createRequest: publicProcedure
    .input(
      z.object({
        formatDocument: z.string(),
        code: z.string(),
        ownerName: z.string(),
        ownerPhone: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const docType = ServicesDocument.find((item) => item.code === input.code);
      if (!docType) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Tipe dokumen tidak diketahui!",
        });
      }
      await ctx.db.requestDocument.create({
        data: {
          createdBy: ctx.session?.user.id ?? "PUBLIC",
          updatedBy: ctx.session?.user.id ?? "PUBLIC",
          documentId: docType.documentId,
          ownerPhone: input.ownerPhone,
          ownerName: input.ownerName,
          formatDocument: JSON.parse(input.formatDocument),
          status: Status.NEW,
          templatePath: docType.templatePath,
          code: docType.code,
          RequestDocumentHistory: {
            create: {
              createdBy: ctx.session?.user.id ?? "PUBLIC",
              status: Status.NEW,
            },
          },
        },
      });
    }),
});
export default DocumentRouter;
