"use client";
import { z } from "zod";
import AutoForm, { AutoFormSubmit } from "~/components/ui/auto-form";
import { DynamicPropsArray } from "~/data/service";
import { api } from "~/trpc/react";
import { useToast } from "../ui/use-toast";
import { DialogClose } from "../ui/dialog";
import { useQueue } from "~/app/(dashboard)/hooks/use-queue";

interface FormValidationProps {
  docType: DynamicPropsArray;
  data: string;
  id: string;
}
const FormValidationProps = ({ data, docType, id }: FormValidationProps) => {
  const values = docType.formSchema.parse(JSON.parse(data));
  const { toast } = useToast();
  const { refetch } = useQueue();
  const { mutate } = api.document.validateRequest.useMutation({
    onSuccess: () => {
      toast({
        title: "Berhasil",
        description: "Data tervalidasi!",
      });
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
    refetch();
  };
  return (
    <AutoForm
      onSubmit={onSubmit}
      fieldConfig={docType.validationFieldConfig(data)}
      values={values}
      formSchema={docType.validationSchema}
    >
      <DialogClose>
        <AutoFormSubmit>Simpan</AutoFormSubmit>
      </DialogClose>
    </AutoForm>
  );
};
export default FormValidationProps;
