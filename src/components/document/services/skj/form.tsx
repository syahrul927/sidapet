"use client";
import { useState } from "react";
import AutoForm, { AutoFormSubmit } from "~/components/ui/auto-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { type SKJFormType, skjFormSchema } from "~/data/skj/type";

const SKJDocument = () => {
  const [_result, setResult] = useState<SKJFormType>();
  const onSubmit = (values: SKJFormType) => {
    setResult(values);
  };
  return (
    <Card className="h-fit max-w-2xl">
      <CardHeader>
        <CardTitle>Surat Keterangan Janda</CardTitle>
        <CardDescription>
          Silahkan lengkapi data form dibawah untuk pembuatan surat dokumen.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AutoForm
          formSchema={skjFormSchema}
          onSubmit={onSubmit}
          fieldConfig={{
            gender: {
              fieldType: "radio",
            },
            marriage: {
              fieldType: "radio",
            },
            description: {
              fieldType: "textarea",
              description: "Tuliskan maksud dan keperluan secara lengkap!",
            },
            address: {
              description: "Sesuaikan dengan alamat pada KTP",
              fieldType: "textarea",
            },
          }}
        >
          <AutoFormSubmit>Simpan</AutoFormSubmit>
        </AutoForm>
      </CardContent>
    </Card>
  );
};
export default SKJDocument;
