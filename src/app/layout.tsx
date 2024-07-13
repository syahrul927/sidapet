import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "~/trpc/react";
import NextAuthProvider from "./context/nextauth-provider";
import { TailwindIndicator } from "~/components/ui/tailwind-indicator";
import { ToastProvider } from "@radix-ui/react-toast";
import { Toaster } from "~/components/ui/toaster";

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
      <body className="relative">
        <NextAuthProvider>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </NextAuthProvider>
        <TailwindIndicator />
        <Toaster />
      </body>
    </html>
  );
}
