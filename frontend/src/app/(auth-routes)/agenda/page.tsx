// app/agenda/page.tsx
"use client"

import React from "react";
import { useRouter } from "next/navigation";
import CalendarComponent from "./components/Calendar";
import { Button } from "@/components/ui/button";

export default function AgendaPage() {
    const router = useRouter();

    const handleCreateAppointment = () => {
        router.push("/agenda/criar");
    };

    const handleCreateAppointmentType = () => {
        router.push("/agenda/criar/tipo");
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">Agenda</h1>
                <div className="flex space-x-2">
                    <Button onClick={handleCreateAppointment}>
                        Criar agendamento
                    </Button>
                    <Button variant="secondary" onClick={handleCreateAppointmentType}>
                        Criar tipo de atendimento
                    </Button>
                </div>
            </div>
            <CalendarComponent />
        </div>
    );
}
