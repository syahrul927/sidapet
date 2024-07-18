"use client";
import { z } from "zod";
import AutoForm, { AutoFormSubmit } from "~/components/ui/auto-form";
import { DynamicPropsArray } from "~/data/service";
import { api } from "~/trpc/react";
import generateDocument from "~/utils/generateDocument";
import { useToast } from "../ui/use-toast";

interface FormValidationProps {
  docType: DynamicPropsArray;
  data: string;
  id: string;
  onSubmit: () => void;
}
const FormValidationProps = ({
  data,
  docType,
  id,
  onSubmit: onClose,
}: FormValidationProps) => {
  const values = docType.formSchema.parse(JSON.parse(data));
  const { toast } = useToast();
  const { mutate } = api.document.validateRequest.useMutation({
    onSuccess: () => {
      toast({
        title: "Berhasil",
        description: "Data tervalidasi!",
      });
      onClose();
    },
    onError: () => {
      toast({
        title: "Gagal",
        description: "Data gagal tervalidasi! Silahkan reload web",
        variant: "destructive",
      });
    },
  });
  const onSubmit = (values: z.infer<typeof docType.validationSchema>) => {
    mutate({ id, formatDocument: JSON.stringify(values) });
  };
  return (
    <AutoForm
      onSubmit={onSubmit}
      fieldConfig={docType.validationFieldConfig(values)}
      values={values}
      formSchema={docType.validationSchema}
    >
      {/* <p>{data}</p> */}
      <AutoFormSubmit>Simpan</AutoFormSubmit>
    </AutoForm>
  );
};
export default FormValidationProps;
