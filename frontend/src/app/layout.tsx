import type { Metadata } from "next";
import { Rethink_Sans } from "next/font/google";
import "@/app/globals.css"
import { ReactNode } from "react"
import { Toaster } from "react-hot-toast";
import { UserProvider } from "@/context/UserContext";

const rethinkSans = Rethink_Sans({
  variable: "--font-rethink-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "AspisMed",
  description: "Aplicação para gerenciamento hospitalar",
};


export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="pt-BR">
        <body>
        <Toaster />

        {/*
          Se você quiser que TODO o app (público e privado)
          tenha acesso ao user context, coloque aqui.
        */}
        <UserProvider>
            {children}
        </UserProvider>
        </body>
        </html>
    )
}

