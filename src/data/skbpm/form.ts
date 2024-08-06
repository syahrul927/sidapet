import { z } from "zod";
import {
  BasicSchema,
  formAgama,
  formJenisKelamin,
  formPekerjaan,
} from "../basic-schema";
import { type FieldConfig } from "~/components/ui/auto-form/types";

export const SKBPMFormSchema = BasicSchema.extend({
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
    .transform((str) => str.padStart(3, "0")),
  rw: z
    .string({ description: "RW Surat Pengantar" })
    .max(3)
    .transform((str) => str.padStart(3, "0")),
  keperluan: z.string({
    description: "Keperluan/Alasan membuat surat.",
  }),
});

export type SKBPMFormType = z.infer<typeof SKBPMFormSchema>;
export const SKBPMFormFieldConfig: FieldConfig<SKBPMFormType> = {
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
  keperluan: {
    description: `Contoh: "Administrasi Bank", "Administrasi PT" dan sebagainya.`,
  },
};
