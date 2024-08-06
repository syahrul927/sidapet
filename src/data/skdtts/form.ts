import { z } from "zod"
import { type FieldConfig } from "~/components/ui/auto-form/types"
import {
    BasicSchema,
    formAgama,
    formJenisKelamin,
    formPekerjaan,
} from "../basic-schema"

export const SKDTTSFormSchema = BasicSchema.extend({
    kotaLahir: z.string({ description: "Tempat Lahir" }),
    tglLahir: z.coerce.date({ description: "Tanggal Lahir" }),
    pekerjaan: formPekerjaan,
    jenisKelamin: formJenisKelamin,
    agama: formAgama,
    nik: z.string({ description: "NIK" }).min(6),
    alamatKtp: z.string({ description: "Alamat Sesuai KTP" }),
    suratPengantar: z.string({
        description: "Upload foto surat pengantar dari RT/RW anda.",
    }),
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
    alamatSementara: z.string({ description: "Alamat Lengkap Sementara" }),
    keperluan: z.string({
        description: "Keperluan/Alasan membuat surat.",
    }),
})

export type SKDTTSFormType = z.infer<typeof SKDTTSFormSchema>
export const SKDTTSFormFieldConfig: FieldConfig<SKDTTSFormType> = {
    suratPengantar: {
        fieldType: "file",
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
