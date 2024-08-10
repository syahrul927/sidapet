"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { type BuiltInProviderType } from "next-auth/providers/index"
import {
    signIn,
    useSession,
    type ClientSafeProvider,
    type LiteralUnion,
} from "next-auth/react"
import { useRouter } from "next/navigation"
import * as React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { cn } from "~/lib/cn"
import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import Spinner from "../ui/spinner"
import { useToast } from "../ui/use-toast"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
    providers: Record<
        LiteralUnion<BuiltInProviderType, string>,
        ClientSafeProvider
    > | null
    csrfToken?: string
}

const formLogin = z.object({
    email: z.string(),
    password: z.string(),
    csrfToken: z.string().optional(),
})
export function UserSigninForm({
    className,
    csrfToken,
    ...props
}: Readonly<UserAuthFormProps>) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const { toast } = useToast()
    const router = useRouter()
    const { data, status } = useSession()

    const form = useForm<z.infer<typeof formLogin>>({
        defaultValues: {
            csrfToken,
        },
        resolver: zodResolver(formLogin),
    })
    const onSubmit = (values: z.infer<typeof formLogin>) => {
        setIsLoading(true)
        signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
        })
            .then((resp) => {
                if (!resp?.ok) {
                    toast({
                        title: "Gagal",
                        variant: "destructive",
                        description: "Email atau password salah!",
                    })
                }
            })
            .catch((err) => {
                console.log(err)
                toast({
                    title: "Oops...",
                    variant: "destructive",
                    description:
                        "Terjadi kesalahan sistem. Segera hubungi developer!",
                })
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    React.useEffect(() => {
        if (data && status === "authenticated") {
            toast({
                title: "Selamat Datang",
                description: `${data?.user.name}`,
            })
            return router.push("/")
        }
    }, [data, status])
    return (
        <div className={cn("grid gap-6 ", className)} {...props}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid gap-3">
                        <div className="grid gap-1">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                autoCapitalize="none"
                                                autoComplete="email"
                                                autoCorrect="off"
                                                disabled={isLoading}
                                                placeholder="Email"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid gap-1">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                autoCapitalize="none"
                                                disabled={isLoading}
                                                placeholder="password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button disabled={isLoading} type="submit" className="">
                            Masuk
                            {isLoading && (
                                <Spinner className="mr-2 h-4 w-4 animate-spin" />
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
