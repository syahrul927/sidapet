"use client"

import { z } from "zod"
import { SKBPMFormSchema } from "./form"
import { type FieldConfig } from "~/components/ui/auto-form/types"
import { parseToSchema } from "~/utils/json-utils"
import PhotoPreview from "~/components/document/photo-preview"

export const SKBPMValidationSchema = SKBPMFormSchema.extend({
    rt: z
        .string({ description: "RT Surat Pengantar" })
        .max(3)
        .transform((str) => str.padStart(3, "0")),
    rw: z
        .string({ description: "RW Surat Pengantar" })
        .max(3)
        .transform((str) => str.padStart(3, "0")),
    suratPengantarValue: z.string({ description: "Kode Surat Pengantar" }),
    tglSuratPengantar: z.coerce.date({
        description: "Tanggal Surat Pengantar dibuat",
    }),
    createdDate: z.coerce
        .date({ description: "Tanggal Pembuatan Surat" })
        .default(new Date()),
})
export const SKBPMValidationFieldConfig = (
    values: string,
): FieldConfig<z.infer<typeof SKBPMValidationSchema>> => {
    const form = parseToSchema(SKBPMFormSchema, values)
    return {
        jenisKelamin: {
            fieldType: "radio",
            inputProps: {
                defaultValue: form.jenisKelamin,
            },
        },
        agama: {
            inputProps: {
                defaultValue: form.agama,
            },
        },
        pekerjaan: {
            inputProps: {
                defaultValue: form.pekerjaan,
            },
        },
        alamatKtp: {
            description: "Sesuaikan dengan alamat pada KTP",
            fieldType: "textarea",
        },
        suratPengantar: {
            renderParent: ({ children }) => {
                return <div className="hidden">{children}</div>
            },
        },
        suratPengantarValue: {
            renderParent: ({ children }) => {
                return (
                    <PhotoPreview
                        src={form.suratPengantar}
                        title="Foto Surat Pengantar"
                    >
                        {children}
                    </PhotoPreview>
                )
            },
            description: "Masukkan kode yang terdapat pada surat pengantar",
        },
    }
}
