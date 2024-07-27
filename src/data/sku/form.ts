import { z } from "zod";
import { type FieldConfig } from "~/components/ui/auto-form/types";
import {
  BasicSchema,
  formAgama,
  formJenisKelamin,
  formPekerjaan,
} from "../basic-schema";

export const SKUFormSchema = BasicSchema.extend({
  kotaLahir: z.string({ description: "Tempat Lahir" }),
  tglLahir: z.coerce.date({ description: "Tanggal Lahir" }),
  pekerjaan: formPekerjaan,
  jenisKelamin: formJenisKelamin,
  pernikahan: z.enum(["Belum Kawin", "Sudah Kawin"], {
    description: "Status Pernikahan",
  }),
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
  namaUsaha: z.string({ description: "Nama Usaha" }),
  alamatUsaha: z.string({ description: "Alamat Usaha" }),
  keperluan: z.string({
    description: "Keperluan/Alasan membuat surat.",
  }),
});

export type SKUFormType = z.infer<typeof SKUFormSchema>;
export const SKUFormFieldConfig: FieldConfig<z.infer<typeof SKUFormSchema>> = {
  suratPengantar: {
    fieldType: "file",
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
    description: `Contoh: "Administrasi Bank", "Administrasi PT" dan sebagainya.`,
  },
};
