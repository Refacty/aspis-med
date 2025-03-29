"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export function Navbar() {
    const router = useRouter()

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
                <Button variant="outline" onClick={() => router.push("/perfil")}>
                    Meu Perfil
                </Button>
                <Button variant="destructive" onClick={handleLogout}>
                    Sair
                </Button>
            </div>
        </div>
    )
}
