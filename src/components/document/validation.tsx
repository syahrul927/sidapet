"use client";
import { type z } from "zod";
import { useQueue } from "~/app/(dashboard)/hooks/use-queue";
import AutoForm, { AutoFormSubmit } from "~/components/ui/auto-form";
import { type DynamicPropsArray } from "~/data/service";
import { api } from "~/trpc/react";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { FaWhatsapp } from "react-icons/fa6";

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
      refetch();
    },
    onError: () => {
      toast({
        title: "Gagal",
        description: "Data gagal tervalidasi! Silahkan reload web",
        variant: "destructive",
      });
      refetch();
    },
  });
  const onSubmit = (values: z.infer<typeof docType.validationSchema>) => {
    mutate({ id, formatDocument: JSON.stringify(values) });
  };
  return (
    <AutoForm
      onSubmit={onSubmit}
      fieldConfig={docType.validationFieldConfig(data)}
      values={values}
      formSchema={docType.validationSchema}
      className="max-w-xs md:w-full md:max-w-full"
    >
      <DialogFooter className="flex-row gap-2">
        <DialogClose>
          <Button variant={"outline"}>
            <FaWhatsapp />
            &nbsp;Hubungi Pemilik Surat
          </Button>
        </DialogClose>
        <DialogClose>
          <AutoFormSubmit>Simpan</AutoFormSubmit>
        </DialogClose>
      </DialogFooter>
    </AutoForm>
  );
};
export default FormValidationProps;
