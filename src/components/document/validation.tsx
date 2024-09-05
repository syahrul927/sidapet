"use client"
import { type z } from "zod"
import { useQueue } from "~/app/(dashboard)/hooks/use-queue"
import AutoForm, { AutoFormSubmit } from "~/components/ui/auto-form"
import { type DynamicPropsArray } from "~/data/service"
import { api } from "~/trpc/react"
import { DialogClose, DialogFooter } from "../ui/dialog"
import { useToast } from "../ui/use-toast"
import WhatsappButton from "../ui/whatsapp-button"
import LoadingPage from "../ui/loading-page"

interface FormValidationProps {
    onClose: () => void
    docType: DynamicPropsArray
    id: string
}
const FormValidationProps = ({ docType, id, onClose }: FormValidationProps) => {
    const { data } = api.document.getDetailRequest.useQuery(id)
    const values = docType.formSchema
        .partial()
        .parse(JSON.parse(data?.formatDocument ?? "{}"))
    const { toast } = useToast()
    const { refetch } = useQueue()
    const { mutate } = api.document.validateRequest.useMutation({
        onSuccess: () => {
            toast({
                title: "Berhasil",
                description: "Data tervalidasi!",
            })
            onClose()
            refetch()
        },
        onError: () => {
            toast({
                title: "Gagal",
                description: "Data gagal tervalidasi! Silahkan reload web",
                variant: "destructive",
            })
            refetch()
        },
    })
    const onSubmit = (values: z.infer<typeof docType.validationSchema>) => {
        mutate({ id, formatDocument: JSON.stringify(values) })
    }
    return !data ? (
        <LoadingPage />
    ) : (
        <AutoForm
            onSubmit={onSubmit}
            fieldConfig={docType.validationFieldConfig(data.formatDocument)}
            values={values}
            formSchema={docType.validationSchema}
        >
            <DialogFooter className="flex-row gap-2">
                <DialogClose>
                    <WhatsappButton
                        phoneNumber={values.phoneNumber ?? ""}
                        name={values.name ?? ""}
                        title={docType.title}
                    />
                </DialogClose>
                <AutoFormSubmit>Simpan</AutoFormSubmit>
            </DialogFooter>
        </AutoForm>
    )
}
export default FormValidationProps
