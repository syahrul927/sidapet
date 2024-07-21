import { z } from "zod";
import {
  BasicSchema,
  formAgama,
  formJenisKelamin,
  formPekerjaan,
} from "../basic-schema";
import { FieldConfig } from "~/components/ui/auto-form/types";

export const SKKFormSchema = BasicSchema.extend({
  namaKepalaKeluarga: z.string(),
  nomorKartuKeluarga: z.string(),
  jenazah: z.object({
    nikJenazah: z.string(),
    namaJenazah: z.string(),
    jenisKelaminJenazah: formJenisKelamin,
    tempatLahirJenazah: z.string(),
    tglLahirJenazah: z.coerce.date(),
    agamaJenazah: formAgama,
    pekerjaanJenazah: formPekerjaan,
    alamatJenazah: z.string(),
    anakKeJenazah: z.number({ description: "Anak ke" }),
    tanggalKematianJenazah: z.coerce.date({ description: "Tanggal Kematian" }),
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
    nikPelapor: z.string(),
    namaPelapor: z.string(),
    tempatLahirPelapor: z.string(),
    tglLahirPelapor: z.coerce.date(),
    pekerjaanPelapor: formPekerjaan,
    alamatPelapor: z.string(),
  }),
  saksi1: z.object({
    nikSaksi1: z.string(),
    namaSaksi1: z.string(),
    tempatLahirSaksi1: z.string(),
    tglLahirSaksi1: z.coerce.date(),
    pekerjaanSaksi1: formPekerjaan,
    alamatSaksi1: z.string(),
  }),
  saksi2: z.object({
    nikSaksi2: z.string(),
    namaSaksi2: z.string(),
    tempatLahirSaksi2: z.string(),
    tglLahirSaksi2: z.coerce.date(),
    pekerjaanSaksi2: formPekerjaan,
    alamatSaksi2: z.string(),
  }),
});
export type SKKFormType = z.infer<typeof SKKFormSchema>;
export const SKKFormFieldConfig: FieldConfig<z.infer<typeof SKKFormSchema>> = {
  jenazah: {
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
    alamatPelapor: {
      fieldType: "textarea",
    },
  },
  saksi1: {
    alamatSaksi1: {
      fieldType: "textarea",
    },
  },
  saksi2: {
    alamatSaksi2: {
      fieldType: "textarea",
    },
  },
};
