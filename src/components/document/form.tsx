"use client";
import { type TypeOf, type z } from "zod";
import AutoForm, {
  AutoFormAlert,
  AutoFormSubmit,
} from "~/components/ui/auto-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { api, type RouterOutputs } from "~/trpc/react";
import { type FieldConfig } from "../ui/auto-form/types";
import { type ZodObjectOrWrapped } from "../ui/auto-form/utils";

type ResponseSuccess = RouterOutputs["document"]["createRequest"];
interface ServiceFormDocumentProps<T extends ZodObjectOrWrapped> {
  title: string;
  description?: string;
  code: string;
  schema: T;
  fieldConfig?: FieldConfig<z.infer<T>>;
  onSuccess: (response: ResponseSuccess) => void;
  onError: () => void;
}
const ServiceFormDocument = <T extends ZodObjectOrWrapped>(
  props: ServiceFormDocumentProps<T>,
) => {
  const { mutate, isPending } = api.document.createRequest.useMutation({
    onSuccess: (response) => {
      props.onSuccess(response);
    },
    onError: () => {
      props.onError();
    },
  });
  const onSubmit = (values: TypeOf<T>) => {
    mutate({
      formatDocument: JSON.stringify(values),
      code: props.code,
      ownerName: values.name,
      ownerPhone: values.phoneNumber,
    });
  };
  return (
    <Card className="h-fit max-w-2xl">
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
        <CardDescription>
          {props.description ??
            "Silahkan lengkapi data form dibawah untuk pembuatan surat dokumen."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AutoForm
          formSchema={props.schema}
          onSubmit={onSubmit}
          fieldConfig={props.fieldConfig}
        >
          <AutoFormAlert />
          <AutoFormSubmit disabled={isPending}>Simpan</AutoFormSubmit>
        </AutoForm>
      </CardContent>
    </Card>
  );
};
export default ServiceFormDocument;
