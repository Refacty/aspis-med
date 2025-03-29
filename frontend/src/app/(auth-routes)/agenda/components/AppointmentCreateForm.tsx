// app/agenda/components/AppointmentCreateForm.tsx
"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { createAppointment, fetchPatients } from "@/lib/api"
import { Patient } from "@/types/types"
import { useUserContext } from "@/context/UserContext"
import {toastError, toastSuccess} from "@/lib/utils";

interface AppointmentCreateFormProps {
    onSuccess: () => void
}

export default function AppointmentCreateForm({ onSuccess }: AppointmentCreateFormProps) {
    const { user } = useUserContext()
    const professionalId = user?.id

    const [patients, setPatients] = useState<Patient[]>([])
    const [patientId, setPatientId] = useState<number | "">("")
    const [dateTime, setDateTime] = useState("")

    // Carrega a lista de pacientes do backend
    useEffect(() => {
        const loadPatients = async () => {
            try {
                const data = await fetchPatients()
                setPatients(data)
            } catch (error) {
                console.error("Erro ao carregar pacientes", error)
                toastError("Erro ao carregar pacientes")
            }
        }
        loadPatients()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!patientId || !dateTime || !professionalId) {
            toastError("Preencha todos os campos")
            return
        }
        try {
            await createAppointment(professionalId, Number(patientId), dateTime)
            toastSuccess("Agendamento criado com sucesso!")
            onSuccess()
        } catch (error:any) {
            toastError(error.message);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block mb-1">Paciente</label>
                <Select
                    value={patientId ? patientId.toString() : ""}
                    onValueChange={(value) => setPatientId(Number(value))}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione um paciente" />
                    </SelectTrigger>
                    <SelectContent>
                        {patients.map((patient) => (
                            <SelectItem key={patient.id} value={patient.id.toString()}>
                                {patient.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div>
                <label className="block mb-1">Data e Hora</label>
                <Input
                    type="datetime-local"
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                    required
                />
            </div>
            <Button type="submit">Criar Agendamento</Button>
        </form>
    )
}
