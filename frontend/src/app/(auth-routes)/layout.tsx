// (auth-routes)/layout.tsx
"use client"

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { UserProvider, useUserContext } from "@/context/UserContext"
import { Navbar } from "@/app/components/Navbar"
import { Sidebar } from "@/app/components/Sidebar"
import { Toaster } from "react-hot-toast"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <UserProvider>
            <ProtectedPage>
                {children}
            </ProtectedPage>
            <Toaster/>
        </UserProvider>
    )
}

// Componente que realmente verifica se user está logado
function ProtectedPage({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const { user } = useUserContext()

    useEffect(() => {
        if (!user) {
            // Se não tem user logado, redireciona para /entrar
            router.push("/entrar")
        }
    }, [user, router])

    if (!user) {
        return null
    }

    return (
        <div className="min-h-screen flex">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="p-4">{children}</main>
            </div>
        </div>
    )
}
