"use client";
import { MessageCircleWarningIcon } from "lucide-react";
import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import AutoForm from "~/components/ui/auto-form";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useFormField } from "~/components/ui/form";
import { type SKJFormType, skjFormSchema } from "~/data/skj/type";
import generateDocument from "~/utils/generateDocument";

interface SKJFormValidationProps {
  data?: SKJFormType;
}
const SKJFormValidation = ({ data }: SKJFormValidationProps) => {
  const onSubmit = async (values: SKJFormType) => {
    try {
      await generateDocument({
        documentTitle: "Surat Keterangan Janda",
        email: values.email,
        name: values.name,
        phoneNumber: values.phoneNumber,
        nikKtp: values.ktpFile,
      });
    } catch (error) {}
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Konfirmasi Data</CardTitle>
      </CardHeader>
      <CardContent>
        <AutoForm
          values={{
            email: data?.email,
            name: data?.name,
            phoneNumber: data?.phoneNumber,
          }}
          onSubmit={onSubmit}
          formSchema={skjFormSchema}
          fieldConfig={{
            ktpFile: {
              renderParent({ children }) {
                return (
                  <div className="flex flex-col space-y-3">
                    <div>
                      {data?.ktpFile && (
                        <Image
                          alt="imagektp"
                          width={200}
                          height={200}
                          src={data.ktpFile}
                        />
                      )}
                    </div>
                    <div>{children}</div>
                  </div>
                );
              },
            },
          }}
        >
          <AlertSuccess />
          <Button>Validate</Button>
        </AutoForm>
      </CardContent>
    </Card>
  );
};
export default SKJFormValidation;
const AlertSuccess = () => {
  const { invalid } = useFormField();
  return (
    <>
      {invalid && (
        <Alert className="border-green-600 text-green-400">
          <MessageCircleWarningIcon color="var(--text-green-400)" />
          <AlertTitle>Yeay!</AlertTitle>
          <AlertDescription>
            Semua data valid sekarang bisa di print!
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};
