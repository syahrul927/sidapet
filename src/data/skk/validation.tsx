"use client"
import { z } from "zod"
import { type FieldConfig } from "~/components/ui/auto-form/types"
import { parseToSchema } from "~/utils/json-utils"
import { SKKFormSchema } from "./form"

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
            pekerjaanPelapor: {
                inputProps: {
                    defaultValue: form.pelapor.pekerjaanPelapor,
                },
            },
        },
        saksi1: {
            pekerjaanSaksi1: {
                inputProps: {
                    defaultValue: form.saksi1.pekerjaanSaksi1,
                },
            },
        },
        saksi2: {
            pekerjaanSaksi2: {
                inputProps: {
                    defaultValue: form.saksi2.pekerjaanSaksi2,
                },
            },
        },
    }
}
