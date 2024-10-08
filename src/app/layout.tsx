import "~/styles/globals.css"

import { GeistSans } from "geist/font/sans"

import { TailwindIndicator } from "~/components/ui/tailwind-indicator"
import { ThemeProvider } from "~/components/ui/theme-provider"
import { Toaster } from "~/components/ui/toaster"
import { TRPCReactProvider } from "~/trpc/react"
import NextAuthProvider from "./context/nextauth-provider"

export const metadata = {
    title: "SIDAPET",
    description: "Aplikasi Pengajuan Surat Kelurahan Margahayu",
    icons: [{ rel: "icon", url: "/logo.webp" }],
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={`${GeistSans.variable}`}>
            <body className="relative">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                >
                    <NextAuthProvider>
                        <TRPCReactProvider>{children}</TRPCReactProvider>
                    </NextAuthProvider>
                    <TailwindIndicator />
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    )
}
