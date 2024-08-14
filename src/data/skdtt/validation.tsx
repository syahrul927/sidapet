"use client"

import { z } from "zod"
import PhotoPreview from "~/components/document/photo-preview"
import { type FieldConfig } from "~/components/ui/auto-form/types"
import { SKDTTFormSchema } from "./form"
import { parseToSchema } from "~/utils/json-utils"

export const SKDTTValidationSchema = SKDTTFormSchema.extend({
    rt: z
        .string({ description: "RT Surat Pengantar" })
        .max(3)
        .default("")
        .transform((str) => str.padStart(3, "0")),
    rw: z
        .string({ description: "RW Surat Pengantar" })
        .max(3)
        .default("")
        .transform((str) => str.padStart(3, "0")),
    suratPengantarValue: z.string({ description: "Kode Surat Pengantar" }),
    tglSuratPengantar: z.coerce.date({
        description: "Tanggal Surat Pengantar dibuat",
    }),
    createdDate: z.coerce
        .date({ description: "Tanggal Pembuatan Surat" })
        .default(new Date()),
})

export const SKDTTValidationFieldConfig = (
    values: string,
): FieldConfig<z.infer<typeof SKDTTValidationSchema>> => {
    const form = parseToSchema(SKDTTFormSchema, values)
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
        alamatDomisili: {
            description: "Tuliskan detail alamat tempat anda berdomisili",
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
