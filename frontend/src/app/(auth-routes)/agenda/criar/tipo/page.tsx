// app/agenda/criar/tipo/pae.tsx
"use client"

import React from "react";
import { useRouter } from "next/navigation";
import AppointmentTypeCreateForm from "@/app/(auth-routes)/agenda/components/AppointmentTypeCreateForm";

export default function CreateAppointmentTypePage() {
    const router = useRouter();

    const handleSuccess = () => {
        router.push("/agenda");
    };

    return (
        <div className="max-w-lg mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Criar Tipo de Atendimento</h1>
            <AppointmentTypeCreateForm onSuccess={handleSuccess} />
        </div>
    );
}
