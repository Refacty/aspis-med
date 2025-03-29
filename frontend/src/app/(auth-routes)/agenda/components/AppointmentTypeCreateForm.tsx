// app/agenda/components/AppointmentTypeCreateForm.tsx
"use client"

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createAppointmentType } from "@/lib/api";
import toast from "react-hot-toast";
import { toastError, toastSuccess } from "@/lib/utils";

interface AppointmentTypeCreateFormProps {
    onSuccess: () => void;
}

export default function AppointmentTypeCreateForm({ onSuccess }: AppointmentTypeCreateFormProps) {
    const [description, setDescription] = useState("");
    const [defaultValue, setDefaultValue] = useState<number | "">("");
    const [defaultDuration, setDefaultDuration] = useState<number | "">("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!description || !defaultValue || !defaultDuration) {
            toast.error("Preencha todos os campos");
            return;
        }
        try {
            await createAppointmentType(description, Number(defaultValue), Number(defaultDuration));
            toastSuccess("Tipo de atendimento criado com sucesso!");
            onSuccess();
        } catch (error: any) {
            toastError(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block mb-1">Descrição</label>
                <Input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div>
                <label className="block mb-1">Valor Padrão</label>
                <Input
                    type="number"
                    value={defaultValue}
                    onChange={(e) => setDefaultValue(e.target.value ? Number(e.target.value) : "")}
                    required
                />
            </div>
            <div>
                <label className="block mb-1">Duração Padrão (minutos)</label>
                <Input
                    type="number"
                    value={defaultDuration}
                    onChange={(e) => setDefaultDuration(e.target.value ? Number(e.target.value) : "")}
                    required
                />
            </div>
            <Button type="submit">Criar Tipo de Atendimento</Button>
        </form>
    );
}
