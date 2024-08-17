"use client"
import { z } from "zod"
import { type FieldConfig } from "~/components/ui/auto-form/types"
import { parseToSchema } from "~/utils/json-utils"
import { SKKFormSchema } from "./form"
import PhotoPreview from "~/components/document/photo-preview"

export const SKKValidationScema = SKKFormSchema.extend({
    createdDate: z.coerce
        .date({ description: "Tanggal Pembuatan Surat" })
        .default(new Date()),
})

export const SKKValidationFieldConfig = (
    values: string,
): FieldConfig<z.infer<typeof SKKValidationScema>> => {
    const form = parseToSchema(SKKFormSchema, values)

    return {
        jenazah: {
            photoKtpJenazah: {
                renderParent: ({}) => {
                    return (
                        <PhotoPreview
                            src={form.jenazah.photoKtpJenazah}
                            title="Foto KTP Jenazah"
                        ></PhotoPreview>
                    )
                },
            },
            photoKKJenazah: {
                renderParent: ({}) => {
                    return (
                        <PhotoPreview
                            src={form.jenazah.photoKKJenazah}
                            title="Foto KK Jenazah"
                        ></PhotoPreview>
                    )
                },
            },
            jenisKelaminJenazah: {
                fieldType: "radio",
            },
            jamKematianJenazah: {
                fieldType: "datetime",
            },
            agamaJenazah: {
                inputProps: {
                    defaultValue: form.jenazah.agamaJenazah,
                },
            },
            pekerjaanJenazah: {
                inputProps: {
                    defaultValue: form.jenazah.pekerjaanJenazah,
                },
            },
        },
        ayah: {
            pekerjaanAyah: {
                inputProps: {
                    defaultValue: form.ayah.pekerjaanAyah,
                },
            },
        },
        ibu: {
            pekerjaanIbu: {
                inputProps: {
                    defaultValue: form.ibu.pekerjaanIbu,
                },
            },
        },
        pelapor: {
            photoKtpPelapor: {
                renderParent: ({}) => {
                    return (
                        <PhotoPreview
                            src={form.pelapor.photoKtpPelapor}
                            title="Foto KTP Pelapor"
                        ></PhotoPreview>
                    )
                },
            },
            pekerjaanPelapor: {
                inputProps: {
                    defaultValue: form.pelapor.pekerjaanPelapor,
                },
            },
        },
        saksi1: {
            photoKtpSaksi1: {
                renderParent: ({}) => {
                    return (
                        <PhotoPreview
                            src={form.saksi1.photoKtpSaksi1}
                            title="Foto KTP Saksi 1"
                        ></PhotoPreview>
                    )
                },
            },
            pekerjaanSaksi1: {
                inputProps: {
                    defaultValue: form.saksi1.pekerjaanSaksi1,
                },
            },
        },
        saksi2: {
            photoKtpSaksi2: {
                renderParent: ({}) => {
                    return (
                        <PhotoPreview
                            src={form.saksi2.photoKtpSaksi2}
                            title="Foto Saksi 2"
                        ></PhotoPreview>
                    )
                },
            },
            pekerjaanSaksi2: {
                inputProps: {
                    defaultValue: form.saksi2.pekerjaanSaksi2,
                },
            },
        },
    }
}
