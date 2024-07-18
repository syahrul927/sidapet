"use client";
import { z } from "zod";
import { SKUFormSchema } from "./form";
import { FieldConfig } from "~/components/ui/auto-form/types";
import Image from "next/image";

// Berdasarkan surat keterangan dari RT/RW setempat dan berdasarkan pengakuan yang bersangkutan bahwa benarsampai dengan diterbitkan surat keterangan ini nama yangtersebut di atas benar memiliki usaha Fotocopy & Rental“77 KOMPUTERT” yang beralamat di Jl. MH. HasibuanRT. 004 RW. 004 No. 42 Kelurahan Margahayu KecamatanBekasi Timur Kota Bekasi
export const SKJValidationSchema = SKUFormSchema.extend({
  suratPengantarValue: z.string({ description: "Kode Surat Pengantar" }),
  createdDate: z.coerce
    .date({ description: "Tanggal Pembuatan Surat" })
    .default(new Date()),
});

export const SKJValidationFieldConfig = (
  values: z.infer<typeof SKUFormSchema>,
): FieldConfig<z.infer<typeof SKJValidationSchema>> => {
  return {
    jenisKelamin: {
      fieldType: "radio",
      inputProps: {
        defaultValue: values.jenisKelamin,
      },
    },
    agama: {
      inputProps: {
        defaultValue: values.agama,
      },
    },
    pekerjaan: {
      inputProps: {
        defaultValue: values.pekerjaan,
      },
    },
    pernikahan: {
      fieldType: "radio",
      inputProps: {
        defaultValue: values.pernikahan,
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
          <div className="flex flex-col">
            <div className="relative aspect-square h-[500px] w-fit">
              <Image
                fill
                src={values.suratPengantar}
                alt="Surat Pengantar"
                className=" object-contain"
              />
            </div>
            {children}
          </div>
        );
      },
      description: "Masukkan kode yang terdapat pada surat pengantar",
    },
  };
};
