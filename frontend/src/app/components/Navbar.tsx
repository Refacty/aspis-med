"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useUserContext } from "@/context/UserContext"

export function Navbar() {
    const router = useRouter()
    const {user} = useUserContext()

    useEffect(() => {
        console.log(user);
    }, [user])

    const handleLogout = () => {
        // Example: remove token from localStorage
        localStorage.removeItem("token")
        router.push("/entrar")
    }

    return (
        <div className="border-b h-16 px-4 flex items-center justify-between">
            <div>
                {/* You can place a brand/logo or a page title here */}
                <h1 className="text-xl font-bold">AspisMed</h1>
            </div>
            <div className="flex items-center space-x-2">
                {user && <Button variant="outline" onClick={() => router.push("/perfil")}>
                    Meu Perfil
                </Button>}
                {user && <Button variant="destructive" onClick={handleLogout}>
                    Sair
                </Button>}
                {!user && <Button variant="outline" onClick={() => {router.push('/entrar')}}>
                    Entrar
                </Button>}
                {!user && <Button variant="outline" onClick={() => {router.push('/cadastro')}}>
                    Cadastrar-se
                </Button>}
            </div>
        </div>
    )
}
