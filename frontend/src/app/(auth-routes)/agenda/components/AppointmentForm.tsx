// app/agenda/components/AppointmentForm.tsx
"use client"

import React, { useState } from "react"
import { Appointment } from "@/types/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { updateAppointment } from "@/lib/api"
import toast from "react-hot-toast"

interface AppointmentFormProps {
    appointment: Appointment
    onSuccess: () => void
}

export default function AppointmentForm({ appointment, onSuccess }: AppointmentFormProps) {
    // Inicialmente, converta a data para o formato aceito pelo input datetime-local
    const initialDateTime = new Date(appointment.dateTime)
        .toISOString()
        .slice(0, 16)

    const [dateTime, setDateTime] = useState(initialDateTime)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await updateAppointment(appointment.id, { dateTime })
            toast.success("Atendimento atualizado com sucesso!")
            onSuccess()
        } catch (error) {
            console.error(error)
            toast.error("Erro ao atualizar o atendimento.")
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block mb-1">Data e Hora</label>
                <Input
                    type="datetime-local"
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                />
            </div>
            <Button type="submit">Salvar</Button>
        </form>
    )
}
