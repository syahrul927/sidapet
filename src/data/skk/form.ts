import { z } from "zod"
import {
    BasicSchema,
    formAgama,
    formJenisKelamin,
    formPekerjaan,
} from "../basic-schema"
import { type FieldConfig } from "~/components/ui/auto-form/types"

export const SKKFormSchema = BasicSchema.extend({
    namaKepalaKeluarga: z.string(),
    nomorKartuKeluarga: z.string(),
    jenazah: z.object({
        photoKtpJenazah: z
            .string({ description: "Upload foto KTP Jenazah" })
            .refine(
                (value) => {
                    const validMimeTypes = [
                        "image/jpeg",
                        "image/png",
                        "image/jpg",
                    ]

                    return validMimeTypes.some((mimeType) =>
                        value.startsWith(`data:${mimeType};base64,`),
                    )
                },
                {
                    message: "Foto tidak valid, harus berupa PNG/JPG/JPEG",
                },
            ),
        nikJenazah: z.string(),
        photoKKJenazah: z
            .string({ description: "Upload foto KK Jenazah" })
            .refine(
                (value) => {
                    const validMimeTypes = [
                        "image/jpeg",
                        "image/png",
                        "image/jpg",
                    ]

                    return validMimeTypes.some((mimeType) =>
                        value.startsWith(`data:${mimeType};base64,`),
                    )
                },
                {
                    message: "Foto tidak valid, harus berupa PNG/JPG/JPEG",
                },
            ),
        namaJenazah: z.string(),
        jenisKelaminJenazah: formJenisKelamin,
        tempatLahirJenazah: z.string(),
        tglLahirJenazah: z.coerce.date(),
        agamaJenazah: formAgama,
        pekerjaanJenazah: formPekerjaan,
        alamatJenazah: z.string(),
        anakKeJenazah: z.number({ description: "Anak ke" }),
        tanggalKematianJenazah: z.coerce.date({
            description: "Tanggal Kematian",
        }),
        jamKematianJenazah: z.coerce.date(),
        sebabKematian: z.string(),
        tempatKematian: z.string(),
        yangMenerangkan: z.string(),
    }),
    ayah: z.object({
        nikAyah: z.string(),
        namaAyah: z.string(),
        tglLahirAyah: z.coerce.date(),
        pekerjaanAyah: formPekerjaan,
        alamatAyah: z.string(),
    }),
    ibu: z.object({
        nikIbu: z.string(),
        namaIbu: z.string(),
        tglLahirIbu: z.coerce.date(),
        pekerjaanIbu: formPekerjaan,
        alamatIbu: z.string(),
    }),
    pelapor: z.object({
        photoKtpPelapor: z
            .string({ description: "Upload foto KTP Pelapor" })
            .refine(
                (value) => {
                    const validMimeTypes = [
                        "image/jpeg",
                        "image/png",
                        "image/jpg",
                    ]

                    return validMimeTypes.some((mimeType) =>
                        value.startsWith(`data:${mimeType};base64,`),
                    )
                },
                {
                    message: "Foto tidak valid, harus berupa PNG/JPG/JPEG",
                },
            ),
        nikPelapor: z.string(),
        namaPelapor: z.string(),
        tempatLahirPelapor: z.string(),
        tglLahirPelapor: z.coerce.date(),
        pekerjaanPelapor: formPekerjaan,
        alamatPelapor: z.string(),
    }),
    saksi1: z.object({
        photoKtpSaksi1: z
            .string({ description: "Upload foto KTP Saksi 1" })
            .refine(
                (value) => {
                    const validMimeTypes = [
                        "image/jpeg",
                        "image/png",
                        "image/jpg",
                    ]

                    return validMimeTypes.some((mimeType) =>
                        value.startsWith(`data:${mimeType};base64,`),
                    )
                },
                {
                    message: "Foto tidak valid, harus berupa PNG/JPG/JPEG",
                },
            ),
        nikSaksi1: z.string(),
        namaSaksi1: z.string(),
        tempatLahirSaksi1: z.string(),
        tglLahirSaksi1: z.coerce.date(),
        pekerjaanSaksi1: formPekerjaan,
        alamatSaksi1: z.string(),
    }),
    saksi2: z.object({
        photoKtpSaksi2: z
            .string({ description: "Upload foto KTP Saksi 2" })
            .refine(
                (value) => {
                    const validMimeTypes = [
                        "image/jpeg",
                        "image/png",
                        "image/jpg",
                    ]

                    return validMimeTypes.some((mimeType) =>
                        value.startsWith(`data:${mimeType};base64,`),
                    )
                },
                {
                    message: "Foto tidak valid, harus berupa PNG/JPG/JPEG",
                },
            ),
        nikSaksi2: z.string(),
        namaSaksi2: z.string(),
        tempatLahirSaksi2: z.string(),
        tglLahirSaksi2: z.coerce.date(),
        pekerjaanSaksi2: formPekerjaan,
        alamatSaksi2: z.string(),
    }),
})
export type SKKFormType = z.infer<typeof SKKFormSchema>
export const SKKFormFieldConfig: FieldConfig<z.infer<typeof SKKFormSchema>> = {
    jenazah: {
        photoKtpJenazah: {
            fieldType: "file",
            description:
                "Pastikan format foto berupa PNG/JPG/JPEG dan Maksimal ukuran 1 MB",
            inputProps: {
                accept: "image/png, image/jpeg",
            },
        },
        photoKKJenazah: {
            fieldType: "file",
            description:
                "Pastikan format foto berupa PNG/JPG/JPEG dan Maksimal ukuran 1 MB",
            inputProps: {
                accept: "image/png, image/jpeg",
            },
        },
        jenisKelaminJenazah: {
            fieldType: "radio",
        },
        jamKematianJenazah: {
            fieldType: "datetime",
        },
        alamatJenazah: {
            fieldType: "textarea",
        },
    },
    ayah: {
        alamatAyah: {
            fieldType: "textarea",
        },
    },
    ibu: {
        alamatIbu: {
            fieldType: "textarea",
        },
    },
    pelapor: {
        photoKtpPelapor: {
            fieldType: "file",
            description:
                "Pastikan format foto berupa PNG/JPG/JPEG dan Maksimal ukuran 1 MB",
            inputProps: {
                accept: "image/png, image/jpeg",
            },
        },
        alamatPelapor: {
            fieldType: "textarea",
        },
    },
    saksi1: {
        photoKtpSaksi1: {
            fieldType: "file",
            description:
                "Pastikan format foto berupa PNG/JPG/JPEG dan Maksimal ukuran 1 MB",
            inputProps: {
                accept: "image/png, image/jpeg",
            },
        },
        alamatSaksi1: {
            fieldType: "textarea",
        },
    },
    saksi2: {
        photoKtpSaksi2: {
            fieldType: "file",
            description:
                "Pastikan format foto berupa PNG/JPG/JPEG dan Maksimal ukuran 1 MB",
            inputProps: {
                accept: "image/png, image/jpeg",
            },
        },
        alamatSaksi2: {
            fieldType: "textarea",
        },
    },
}
