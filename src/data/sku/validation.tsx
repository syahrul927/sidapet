"use client";

import { z } from "zod";
import PhotoPreview from "~/components/document/photo-preview";
import { type FieldConfig } from "~/components/ui/auto-form/types";
import { SKUFormSchema } from "./form";
import { parseToSchema } from "~/utils/json-utils";

// Berdasarkan surat keterangan dari RT/RW setempat dan berdasarkan pengakuan yang bersangkutan bahwa benarsampai dengan diterbitkan surat keterangan ini nama yangtersebut di atas benar memiliki usaha Fotocopy & Rental“77 KOMPUTERT” yang beralamat di Jl. MH. HasibuanRT. 004 RW. 004 No. 42 Kelurahan Margahayu KecamatanBekasi Timur Kota Bekasi
export const SKUValidationSchema = SKUFormSchema.extend({
  suratPengantarValue: z.string({ description: "Kode Surat Pengantar" }),
  tglSuratPengantar: z.coerce.date({
    description: "Tanggal Surat Pengantar dibuat",
  }),
  createdDate: z.coerce
    .date({ description: "Tanggal Pembuatan Surat" })
    .default(new Date()),
});

export const SKUValidationFieldConfig = (
  values: string,
): FieldConfig<z.infer<typeof SKUValidationSchema>> => {
  const form = parseToSchema(SKUFormSchema, values);
  return {
    jenisKelamin: {
      fieldType: "radio",
      inputProps: {
        defaultValue: form.jenisKelamin,
      },
    },
    agama: {
      inputProps: {
        defaultValue: form.agama,
      },
    },
    pekerjaan: {
      inputProps: {
        defaultValue: form.pekerjaan,
      },
    },
    pernikahan: {
      fieldType: "radio",
      inputProps: {
        defaultValue: form.pernikahan,
      },
    },
    alamatKtp: {
      description: "Sesuaikan dengan alamat pada KTP",
      fieldType: "textarea",
    },
    alamatUsaha: {
      description: "Alamat tempat ada melakukan bisnis/usaha",
      fieldType: "textarea",
    },
    suratPengantar: {
      renderParent: ({ children }) => {
        return <div className="hidden">{children}</div>;
      },
    },
    suratPengantarValue: {
      renderParent: ({ children }) => {
        return (
          <PhotoPreview src={form.suratPengantar} title="Foto Surat Pengantar">
            {children}
          </PhotoPreview>
        );
      },
      description: "Masukkan kode yang terdapat pada surat pengantar",
    },
  };
};