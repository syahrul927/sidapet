import { z } from "zod"
import {
    BasicSchema,
    formAgama,
    formJenisKelamin,
    formPekerjaan,
} from "../basic-schema"
import { type FieldConfig } from "~/components/ui/auto-form/types"

export const SKBPMFormSchema = BasicSchema.extend({
    photoKtp: z.string({ description: "Upload foto KTP anda" }),
    nik: z.string({ description: "NIK" }).min(6),
    kotaLahir: z.string({ description: "Tempat Lahir" }),
    tglLahir: z.coerce.date({ description: "Tanggal Lahir" }),
    pekerjaan: formPekerjaan,
    jenisKelamin: formJenisKelamin,
    agama: formAgama,
    alamatKtp: z.string({ description: "Alamat Sesuai KTP" }),
    suratPengantar: z.string({
        description: "Upload foto surat pengantar dari RT/RW anda.",
    }),
    keperluan: z.string({
        description: "Keperluan/Alasan membuat surat.",
    }),
})

export type SKBPMFormType = z.infer<typeof SKBPMFormSchema>
export const SKBPMFormFieldConfig: FieldConfig<SKBPMFormType> = {
    suratPengantar: {
        fieldType: "file",
        description: "Pastika format foto berupa PNG/JPG/JPEG",
        inputProps: {
            accept: "image/png, image/jpeg",
        },
    },
    photoKtp: {
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
    keperluan: {
        description: `Contoh: "Administrasi Bank", "Administrasi PT" dan sebagainya.`,
    },
}
