"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "~/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/components/ui/card"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { useToast } from "~/components/ui/use-toast"
import { cn } from "~/lib/cn"
import { api } from "~/trpc/react"

const accountFormSchema = z.object({
    email: z
        .string({ required_error: "Email wajib di isi" })
        .email("Format email belum sesuai"),
    name: z.string({ required_error: "Nama Lengkap wajib di isi" }),
    phoneNumber: z
        .string({ required_error: "Nomor Telepon wajib di isi" })
        .regex(/^08[1-9][0-9]{7,10}$/, "Nomor Telepon tidak sesuai format"),
})

type AccountFormValues = z.infer<typeof accountFormSchema>

interface InformationAccountTabProps {
    id: string
    email?: string
    name?: string
    phoneNumber?: string
}
const InformationAccountTab = ({
    id,
    email,
    name,
    phoneNumber,
}: InformationAccountTabProps) => {
    const { toast } = useToast()
    const router = useRouter()
    const form = useForm<AccountFormValues>({
        defaultValues: {
            email,
            name,
            phoneNumber,
        },
        resolver: zodResolver(accountFormSchema),
    })

    const { mutate, isPending } = api.user.updateAccount.useMutation({
        onSuccess: () => {
            toast({
                title: "Berhasil",
                description: "Data telah disimpan!",
            })
            router.refresh()
        },
        onError: (e) => {
            toast({
                title: "Gagal",
                variant: "destructive",
                description: e.message,
            })
        },
    })
    const onSubmit = (props: AccountFormValues) => {
        mutate({
            id,
            ...props,
        })
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-3"
            >
                <Card>
                    <CardHeader>
                        <CardTitle>Informasi Akun</CardTitle>
                        <CardDescription>
                            Buat perubahan informasi akun disini. Klik simpan
                            ketika selesai mengubah.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-3 ">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="Nama Lengkap"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="Nomor Telepon"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className={cn("flex justify-end gap-3")}>
                            <Button
                                type="button"
                                variant={"ghost"}
                                disabled={!form.formState.isDirty || isPending}
                                onClick={() => form.reset()}
                            >
                                Reset
                            </Button>
                            <Button
                                disabled={!form.formState.isDirty || isPending}
                            >
                                Simpan
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </Form>
    )
}
export default InformationAccountTab
