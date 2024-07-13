import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TailwindIndicator } from "~/components/ui/tailwind-indicator";
import { Toaster } from "~/components/ui/toaster";
import { TRPCReactProvider } from "~/trpc/react";
import NextAuthProvider from "./context/nextauth-provider";
import { ThemeProvider } from "~/components/ui/theme-provider";

export const metadata = {
  title: "SIDAPET",
  description: "Aplikasi Pembuatan Dokumen Kelurahan Margahayu",
  icons: [{ rel: "icon", url: "/logo.webp" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <NextAuthProvider>
            <TRPCReactProvider>{children}</TRPCReactProvider>
          </NextAuthProvider>
          <TailwindIndicator />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
