"use client";
import { useState } from "react";
import AutoForm, { AutoFormSubmit } from "~/components/ui/auto-form";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { SKJFormType, skjFormSchema } from "./data";
import SKJFormValidation from "./validation";

const SKJDocument = () => {
  const [result, setResult] = useState<SKJFormType>();
  const onSubmit = (values: SKJFormType) => {
    setResult(values);
  };
  return (
    <div className="grid grid-cols-2 gap-3">
      <Card className="h-fit">
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
              ktpFile: {
                fieldType: "file",
                label: "Photo KTP",
              },
            }}
          >
            <AutoFormSubmit>Submit</AutoFormSubmit>
          </AutoForm>
        </CardContent>
      </Card>

      <SKJFormValidation data={result} />
    </div>
  );
};
export default SKJDocument;
