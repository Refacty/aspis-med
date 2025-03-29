// app/inicio/components/QuickActions.tsx
"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function QuickActions() {
    const router = useRouter()

    return (
        <div className="flex space-x-2">
            <Button onClick={() => router.push("/agenda")}>Ver Agenda</Button>
            <Button onClick={() => router.push("/pacientes")}>Cadastrar Paciente</Button>
            <Button onClick={() => router.push("/financas")}>Finanças</Button>
        </div>
    )
}
