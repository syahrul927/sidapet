import { Status } from "@prisma/client"
import { TRPCError } from "@trpc/server"
import { z } from "zod"
import { MapServiceDocument, ServicesDocument } from "~/data/service"
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc"

const DocumentRouter = createTRPCRouter({
    findHistoryDocument: protectedProcedure.query(async ({ ctx }) => {
        const documents = await ctx.db.requestDocument.findMany({
            where: {
                status: Status.DONE,
            },
            select: {
                id: true,
                ownerName: true,
                status: true,
                documentConter: true,
                documentCode: true,
                createdDate: true,
                updatedDate: true,
                formatDocument: true,
            },
            orderBy: {
                createdDate: "desc",
            },
        })
        return documents.map((doc) => {
            return {
                ...doc,
                title: MapServiceDocument[doc.documentCode]?.title,
            }
        })
    }),
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
            const docType = ServicesDocument.find(
                (item) => item.code === input.code,
            )
            if (!docType) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Tipe dokumen tidak diketahui!",
                })
            }
            const year = new Date().getFullYear()
            const counter = await ctx.db.counterCategoryDocument.findFirst({
                where: {
                    code: docType.code,
                    year: year,
                },
            })
            const createDocument = ctx.db.requestDocument.create({
                data: {
                    createdBy: ctx.session?.user.id ?? "PUBLIC",
                    updatedBy: ctx.session?.user.id ?? "PUBLIC",
                    documentId: docType.documentId,
                    documentCode: docType.code,
                    documentConter: String(
                        counter?.counter ? counter.counter + 1 : 1,
                    ).padStart(4, "0"),
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
            })
            const increaseDoc = ctx.db.counterCategoryDocument.upsert({
                where: {
                    counterByCodeAndYear: {
                        code: docType.code,
                        year,
                    },
                },
                update: {
                    counter: counter?.counter ? counter.counter + 1 : 1,
                },
                create: {
                    counter: 1,
                    year,
                    code: docType.code,
                },
            })
            const data = await Promise.all([createDocument, increaseDoc])
            return {
                requestId: data[0].id,
            }
        }),
    getWaitingRequest: protectedProcedure.query(async ({ ctx }) => {
        const documents = await ctx.db.requestDocument.findMany({
            where: {
                status: {
                    not: Status.DONE,
                },
            },
            orderBy: {
                createdDate: "asc",
            },
            select: {
                id: true,
                ownerName: true,
                status: true,
                documentConter: true,
                documentCode: true,
                createdDate: true,
                formatDocument: true,
            },
        })
        return documents
    }),
    validateRequest: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                formatDocument: z.string(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const document = await ctx.db.requestDocument.findUnique({
                where: {
                    id: input.id,
                },
            })
            if (!document) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Dokumen tidak valid",
                })
            }
            const requestDocument = ctx.db.requestDocument.update({
                where: {
                    id: input.id,
                },
                data: {
                    formatDocument: JSON.parse(input.formatDocument),
                    status: Status.VALIDATED,
                },
            })
            const historyDocument = ctx.db.requestDocumentHistory.create({
                data: {
                    requestDocumentId: document.id,
                    createdBy: ctx.session?.user.id ?? "PUBLIC",
                    status: Status.VALIDATED,
                },
            })
            await Promise.all([requestDocument, historyDocument])
        }),
    finishDocumentRequest: protectedProcedure
        .input(z.string())
        .mutation(async ({ ctx, input }) => {
            const document = await ctx.db.requestDocument.findUnique({
                where: {
                    id: input,
                },
            })
            if (!document) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Dokumen tidak valid",
                })
            }
            const requestDocument = ctx.db.requestDocument.update({
                where: {
                    id: input,
                },
                data: {
                    status: Status.DONE,
                },
            })
            const historyDocument = ctx.db.requestDocumentHistory.create({
                data: {
                    requestDocumentId: document.id,
                    createdBy: ctx.session?.user.id ?? "PUBLIC",
                    status: Status.DONE,
                },
            })
            await Promise.all([requestDocument, historyDocument])
        }),
    getDetailRequest: protectedProcedure
        .input(z.string())
        .query(async ({ ctx, input }) => {
            const document = await ctx.db.requestDocument.findUnique({
                where: {
                    id: input,
                },
            })
            if (!document) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Dokumen tidak valid",
                })
            }
            return {
                documentCode: document.documentCode,
                documentId: document.documentId,
                documentCounter: document.documentConter,
                formatDocument: JSON.stringify(document.formatDocument),
            }
        }),
    getStatusRequest: publicProcedure
        .input(z.string())
        .query(async ({ ctx, input }) => {
            const document = await ctx.db.requestDocument.findUnique({
                where: {
                    id: input,
                },
            })
            if (!document) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Dokumen tidak valid",
                })
            }
            const docType = MapServiceDocument[document.documentCode]
            return {
                title: docType?.title,
                counter: document.documentConter,
                name: document.ownerName,
                status: document.status,
                notes: docType?.notes,
            }
        }),
})
export default DocumentRouter
