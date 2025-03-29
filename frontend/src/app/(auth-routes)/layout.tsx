// (auth-routes)/layout.tsx
"use client"

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { UserProvider, useUserContext } from "@/context/UserContext"
import { Navbar } from "@/app/components/Navbar"
import { Sidebar } from "@/app/components/Sidebar"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <ProtectedPage>
            {children}
        </ProtectedPage>
    )
}

// Componente que realmente verifica se user está logado
function ProtectedPage({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const { user, isLoading } = useUserContext()

    useEffect(() => {
        // Aguarda o carregamento antes de redirecionar
        if (!isLoading && !user) {
            router.push("/entrar")
        }
    }, [user, isLoading, router])

    if (isLoading || !user) {
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
