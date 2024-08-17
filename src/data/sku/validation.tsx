"use client"

import { z } from "zod"
import PhotoPreview from "~/components/document/photo-preview"
import { type FieldConfig } from "~/components/ui/auto-form/types"
import { SKUFormSchema } from "./form"
import { parseToSchema } from "~/utils/json-utils"

export const SKUValidationSchema = SKUFormSchema.extend({
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

export const SKUValidationFieldConfig = (
    values: string,
): FieldConfig<z.infer<typeof SKUValidationSchema>> => {
    const form = parseToSchema(SKUFormSchema, values)
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
        pernikahan: {
            fieldType: "radio",
            inputProps: {
                defaultValue: form.pernikahan,
            },
        },
        alamatKtp: {
            description: "Sesuaikan dengan alamat pada KTP",
            fieldType: "textarea",
        },
        alamatUsaha: {
            description: "Alamat tempat ada melakukan bisnis/usaha",
            fieldType: "textarea",
        },
        suratPengantar: {
            renderParent: ({ children }) => {
                return <div className="hidden">{children}</div>
            },
        },
        photoKtp: {
            renderParent: ({ children }) => {
                return (
                    <PhotoPreview
                        src={form.photoKtp}
                        title="Foto KTP"
                    ></PhotoPreview>
                )
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
