import { z } from "zod"
import { type FieldConfig } from "~/components/ui/auto-form/types"
import {
    BasicSchema,
    formAgama,
    formJenisKelamin,
    formPekerjaan,
} from "../basic-schema"

export const SKDTTFormSchema = BasicSchema.extend({
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
    alamatDomisili: z.string({ description: "Alamat Lengkap Domisili" }),
    keperluan: z.string({
        description: "Keperluan/Alasan membuat surat.",
    }),
})

export type SKDTTFormType = z.infer<typeof SKDTTFormSchema>
export const SKDTTFormFieldConfig: FieldConfig<SKDTTFormType> = {
    suratPengantar: {
        fieldType: "file",
        description: "Pastika format foto berupa PNG/JPG/JPEG",
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
    alamatDomisili: {
        description: "Tuliskan detail alamat tempat anda berdomisili",
        fieldType: "textarea",
    },
    keperluan: {
        description: `Contoh: "Administrasi Bank", "Administrasi PT" dan sebagainya`,
    },
}
