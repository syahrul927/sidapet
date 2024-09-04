import { z } from "zod"
import { type FieldConfig } from "~/components/ui/auto-form/types"
import {
    BasicSchema,
    formAgama,
    formJenisKelamin,
    formPekerjaan,
} from "../basic-schema"

export const SKDTTSFormSchema = BasicSchema.extend({
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
    alamatSementara: z.string({ description: "Alamat Lengkap Sementara" }),
    keperluan: z.string({
        description: "Keperluan/Alasan membuat surat.",
    }),
})

export type SKDTTSFormType = z.infer<typeof SKDTTSFormSchema>
export const SKDTTSFormFieldConfig: FieldConfig<SKDTTSFormType> = {
    photoKtp: {
        fieldType: "file",
        description:
            "Pastikan format foto berupa PNG/JPG/JPEG dan Maksimal ukuran 1 MB",
        inputProps: {
            accept: "image/png, image/jpeg",
        },
    },
    suratPengantar: {
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
    alamatSementara: {
        description: "Tuliskan detail alamat tempat anda berdomisili sementara",
        fieldType: "textarea",
    },
    keperluan: {
        description: `Contoh: "Administrasi Bank", "Administrasi PT" dan sebagainya`,
    },
}
