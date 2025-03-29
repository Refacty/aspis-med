import type { Metadata } from "next";
import { Rethink_Sans } from "next/font/google";
import "@/app/globals.css"
import { ReactNode } from "react"
import { Sidebar } from "@/app/components/Sidebar"
import { Navbar } from "@/app/components/Navbar"

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
        <body className="min-h-screen flex">
        <Sidebar />

        <div className="flex-1 flex flex-col">
            <Navbar />
            <main className="p-4">
                {children}
            </main>
        </div>
        </body>
        </html>
    )
}

