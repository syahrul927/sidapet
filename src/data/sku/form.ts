import { z } from "zod"
import { type FieldConfig } from "~/components/ui/auto-form/types"
import {
    BasicSchema,
    formAgama,
    formJenisKelamin,
    formPekerjaan,
} from "../basic-schema"

export const SKUFormSchema = BasicSchema.extend({
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
    pernikahan: z.enum(["Belum Kawin", "Sudah Kawin"], {
        description: "Status Pernikahan",
    }),
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
    namaUsaha: z.string({ description: "Nama Usaha" }),
    alamatUsaha: z.string({ description: "Alamat Usaha" }),
    keperluan: z.string({
        description: "Keperluan/Alasan membuat surat.",
    }),
})

export type SKUFormType = z.infer<typeof SKUFormSchema>
export const SKUFormFieldConfig: FieldConfig<z.infer<typeof SKUFormSchema>> = {
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
    pernikahan: {
        fieldType: "radio",
    },
    alamatKtp: {
        description: "Sesuaikan dengan alamat pada KTP",
        fieldType: "textarea",
    },
    alamatUsaha: {
        description: "Alamat tempat ada melakukan bisnis/usaha",
        fieldType: "textarea",
    },
    keperluan: {
        description: `Contoh: "Administrasi Bank", "Administrasi PT" dan sebagainya`,
    },
}
