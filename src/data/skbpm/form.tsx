"use client"
import { z } from "zod"
import {
    BasicSchema,
    formAgama,
    formJenisKelamin,
    formPekerjaan,
} from "../basic-schema"
import { type FieldConfig } from "~/components/ui/auto-form/types"

export const SKBPMFormSchema = BasicSchema.extend({
    photoKtp: z.string({ description: "Upload foto KTP anda" }).refine(
        (value) => {
            const validMimeTypes = ["image/jpeg", "image/png", "image/jpg"]

            return validMimeTypes.some((mimeType) =>
                value.startsWith(`data:${mimeType};base64,`),
            )
        },
        {
            message: "Foto tidak valid, harus berupa PNG/JPG/JPEG",
        },
    ),
    nik: z.string({ description: "NIK" }).min(6),
    kotaLahir: z.string({ description: "Tempat Lahir" }),
    tglLahir: z.coerce.date({ description: "Tanggal Lahir" }),
    pekerjaan: formPekerjaan,
    jenisKelamin: formJenisKelamin,
    agama: formAgama,
    alamatKtp: z.string({ description: "Alamat Sesuai KTP" }),
    suratPengantar: z
        .string({
            description: "Upload foto surat pengantar dari RT/RW anda.",
        })
        .refine(
            (value) => {
                const validMimeTypes = ["image/jpeg", "image/png", "image/jpg"]

                return validMimeTypes.some((mimeType) =>
                    value.startsWith(`data:${mimeType};base64,`),
                )
            },
            {
                message: "Foto tidak valid, harus berupa PNG/JPG/JPEG",
            },
        ),
    keperluan: z.string({
        description: "Keperluan/Alasan membuat surat.",
    }),
})
export type SKBPMFormType = z.infer<typeof SKBPMFormSchema>
export const SKBPMFormFieldConfig: FieldConfig<SKBPMFormType> = {
    suratPengantar: {
        fieldType: "file",
        description:
            "Pastikan format foto berupa PNG/JPG/JPEG dan Maksimal ukuran 1 MB",
        inputProps: {
            accept: "image/png, image/jpeg",
        },
    },
    photoKtp: {
        fieldType: "file",
        description:
            "Pastikan format foto berupa PNG/JPG/JPEG dan Maksimal ukuran 1 MB",
        inputProps: {
            accept: "image/png, image/jpeg",
        },
    },
    jenisKelamin: {
        fieldType: "radio",
    },
    alamatKtp: {
        description: "Sesuaikan dengan alamat pada KTP",
        fieldType: "textarea",
    },
    keperluan: {
        description: `Contoh: "Administrasi Bank", "Administrasi PT" dan sebagainya.`,
    },
}
