// app/agenda/criar/page.tsx
"use client"

import React from "react";
import AppointmentCreateForm from "../components/AppointmentCreateForm";
import { useRouter } from "next/navigation";

export default function CreateAppointmentPage() {
    const router = useRouter();

    const handleSuccess = () => {
        // Redireciona para a agenda após a criação
        router.push("/agenda");
    };

    return (
        <div className="max-w-lg mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Criar Agendamento</h1>
            <AppointmentCreateForm onSuccess={handleSuccess} />
        </div>
    );
}
