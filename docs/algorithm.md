# FIFO Implementation

## Buat Pengajuan Surat
Ketika membuat surat, sistem akan membuat counter berdasarkan tipe surat, dan akan berurutan sesuai dengan urutan yang pengajuan.

Code nya ada pada file `document-router.ts`
```javascript
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
```

## Menampilkan Pengajuan Surat Masuk
Pada tampilan admin, menampilkan daftar pengajuan surat yang masuk ke dalam sistem. Daftar ditampilkan berdasarkan urutan paling awal yang akan muncul paling atas.

Code nya ada pada file `document-router.ts`
```javascript
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
```