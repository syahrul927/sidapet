import { type Metadata } from "next"
import { getProviders } from "next-auth/react"
import { redirect } from "next/navigation"
import { UserSigninForm } from "~/components/auth/user-signin-form"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/components/ui/card"
import { getServerAuthSession } from "~/server/auth"

export const metadata: Metadata = {
    title: "Authentication",
    description: "You need to be authenticated",
}

const AuthenticationPage = async () => {
    const session = await getServerAuthSession()
    if (session?.user.id) {
        redirect("/")
    }
    const providers = await getProviders()
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-3">
            <Card className="border-primary md:max-w-xl">
                <CardHeader>
                    <CardTitle>Masuk</CardTitle>
                    <CardDescription>
                        Masukkan email dan password untuk melakukan sign in
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <UserSigninForm providers={providers} />
                </CardContent>
            </Card>
        </div>
    )
}
export default AuthenticationPage
