import * as zod from "zod";
import { type FieldConfig } from "~/components/ui/auto-form/types";
import {
  BasicSchema,
  formAgama,
  formJenisKelamin,
  formPekerjaan,
} from "../basic-schema";

export const SKUFormSchema = BasicSchema.extend({
  kotaLahir: zod.z.string({ description: "Tempat Lahir" }),
  tglLahir: zod.z.coerce.date({ description: "Tanggal Lahir" }),
  pekerjaan: formPekerjaan,
  jenisKelamin: formJenisKelamin,
  pernikahan: zod.z.enum(["Belum Kawin", "Sudah Kawin"], {
    description: "Status Pernikahan",
  }),
  agama: formAgama,
  nik: zod.z.string({ description: "NIK" }).min(6),
  alamatKtp: zod.z.string({ description: "Alamat Sesuai KTP" }),
  suratPengantar: zod.z.string({
    description: "Upload foto surat pengantar dari RT/RW anda.",
  }),
  namaUsaha: zod.z.string({ description: "Nama Usaha" }),
  alamatUsaha: zod.z.string({ description: "Alamat Usaha" }),
  keperluan: zod.z.string({
    description: "Keperluan/Alasan membuat surat usaha.",
  }),
});

export type SKUFormType = zod.z.infer<typeof SKUFormSchema>;
export const SKUFormFieldConfig: FieldConfig<
  zod.z.infer<typeof SKUFormSchema>
> = {
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
