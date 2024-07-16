"use client";
import { TypeOf, z } from "zod";
import AutoForm, { AutoFormSubmit } from "~/components/ui/auto-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { api } from "~/trpc/react";
import { FieldConfig } from "../ui/auto-form/types";
import { ZodObjectOrWrapped } from "../ui/auto-form/utils";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

interface ServiceFormDocumentProps<T extends ZodObjectOrWrapped> {
  title: string;
  description?: string;
  code: string;
  schema: T;
  fieldConfig?: FieldConfig<z.infer<T>>;
}
const ServiceFormDocument = <T extends ZodObjectOrWrapped>(
  props: ServiceFormDocumentProps<T>,
) => {
  const { toast } = useToast();
  const router = useRouter();
  const { mutate, isPending } = api.document.createRequest.useMutation({
    onSuccess: () => {
      toast({
        title: "Berhasil",
        description: "Berhasil membuat request dokumen",
      });
      void router.push("/document/create");
    },
    onError: () => {
      toast({
        title: "Gagal",
        description: "Data gagal dibuat!",
        variant: "destructive",
      });
      void router.push("/document/create");
    },
  });
  const onSubmit = (values: TypeOf<T>) => {
    mutate({
      formatDocument: JSON.stringify(values),
      code: props.code,
      ownerName: values["name"],
      ownerPhone: values["phoneNumber"],
    });
  };
  return (
    <Card className="h-fit max-w-2xl">
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
        <CardDescription>
          {props.description ??
            "Silahkan lengkapi data form dibawah untuk pembuatan surat dokumen."}
        </CardDescription>{" "}
      </CardHeader>
      <CardContent>
        <AutoForm
          formSchema={props.schema}
          onSubmit={onSubmit}
          fieldConfig={props.fieldConfig}
        >
          <AutoFormSubmit disabled={isPending}>Simpan</AutoFormSubmit>
        </AutoForm>
      </CardContent>
    </Card>
  );
};
export default ServiceFormDocument;
