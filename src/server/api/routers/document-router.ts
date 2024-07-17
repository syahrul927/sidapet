import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { MapServiceDocument, ServicesDocument } from "~/data/service";
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
      const counter = await ctx.db.counterCategoryDocument.findFirst({
        where: {
          code: docType.code,
          year: new Date().getFullYear(),
        },
      });
      await ctx.db.requestDocument.create({
        data: {
          createdBy: ctx.session?.user.id ?? "PUBLIC",
          updatedBy: ctx.session?.user.id ?? "PUBLIC",
          documentId: docType.documentId,
          documentCode: docType.code,
          documentConter: String(
            counter?.counter ? counter.counter + 1 : 1,
          ).padStart(3, "0"),
          ownerPhone: input.ownerPhone,
          ownerName: input.ownerName,
          formatDocument: JSON.parse(input.formatDocument),
          status: Status.NEW,
          templatePath: docType.templatePath,
          RequestDocumentHistory: {
            create: {
              createdBy: ctx.session?.user.id ?? "PUBLIC",
              status: Status.NEW,
            },
          },
        },
      });
    }),
  getWaitingRequest: protectedProcedure.query(async ({ ctx }) => {
    const documents = await ctx.db.requestDocument.findMany({
      where: {
        status: {
          not: "DONE",
        },
      },
      select: {
        id: true,
        ownerName: true,
        status: true,
        documentConter: true,
        documentCode: true,
        createdDate: true,
      },
    });
    return documents.map((doc) => {
      return { ...doc, title: MapServiceDocument[doc.documentCode]?.title };
    });
  }),
});
export default DocumentRouter;
