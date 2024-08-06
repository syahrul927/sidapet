"use client"

import { z } from "zod"
import PhotoPreview from "~/components/document/photo-preview"
import { type FieldConfig } from "~/components/ui/auto-form/types"
import { SKDTTSFormSchema } from "./form"
import { parseToSchema } from "~/utils/json-utils"

export const SKDTTSValidationSchema = SKDTTSFormSchema.extend({
    suratPengantarValue: z.string({ description: "Kode Surat Pengantar" }),
    tglSuratPengantar: z.coerce.date({
        description: "Tanggal Surat Pengantar dibuat",
    }),
    tglMulaiBerlaku: z.coerce.date({
        description: "Surat mulai berlaku dari tanggal",
    }),
    tglAkhirBerlaku: z.coerce.date({
        description: "Surat berakhir berlaku pada tanggal",
    }),
    createdDate: z.coerce
        .date({ description: "Tanggal Pembuatan Surat" })
        .default(new Date()),
})

export const SKDTTSValidationFieldConfig = (
    values: string,
): FieldConfig<z.infer<typeof SKDTTSValidationSchema>> => {
    const form = parseToSchema(SKDTTSFormSchema, values)
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
        alamatSementara: {
            description:
                "Tuliskan detail alamat tempat anda berdomisili sementara",
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
