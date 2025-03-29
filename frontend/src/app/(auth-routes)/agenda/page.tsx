// app/agenda/page.tsx
"use client"

import React from "react"
import { useRouter } from "next/navigation"
import CalendarComponent from "./components/Calendar"
import { Button } from "@/components/ui/button"

export default function AgendaPage() {
    const router = useRouter()

    const handleCreate = () => {
        router.push("/agenda/criar")
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">Agenda</h1>
                <Button onClick={handleCreate}>
                    Criar Agendamento
                </Button>
            </div>
            <CalendarComponent />
        </div>
    )
}
