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
import { Checkbox } from "@/components/ui/checkbox"
import { createAppointment, fetchPatients, fetchAppointmentTypes } from "@/lib/api"
import toast from "react-hot-toast"
import { Patient, AppointmentType } from "@/types/types"
import { useUserContext } from "@/context/UserContext"
import { toastError, toastSuccess } from "@/lib/utils"

interface AppointmentCreateFormProps {
    onSuccess: () => void
}

export default function AppointmentCreateForm({ onSuccess }: AppointmentCreateFormProps) {
    const { user } = useUserContext()
    const professionalId = user?.id

    const [patients, setPatients] = useState<Patient[]>([])
    const [appointmentTypes, setAppointmentTypes] = useState<AppointmentType[]>([])
    const [patientId, setPatientId] = useState<number | "">("")
    const [appointmentTypeId, setAppointmentTypeId] = useState<number | "">("")
    const [dateTime, setDateTime] = useState("")
    const [paymentStatus, setPaymentStatus] = useState<string>("PENDING") // padrão
    const [appointmentStatus, setAppointmentStatus] = useState<string>("SCHEDULED") // padrão
    const [recurring, setRecurring] = useState<boolean>(false)
    const [value, setValue] = useState<number | "">("")

    // Carrega a lista de pacientes
    useEffect(() => {
        const loadPatients = async () => {
            try {
                const data = await fetchPatients()
                setPatients(data)
            } catch (error) {
                console.error("Erro ao carregar pacientes", error)
                toast.error("Erro ao carregar pacientes")
            }
        }
        loadPatients()
    }, [])

    // Carrega os tipos de atendimento
    useEffect(() => {
        const loadAppointmentTypes = async () => {
            try {
                const data = await fetchAppointmentTypes()
                setAppointmentTypes(data)
            } catch (error) {
                console.error("Erro ao carregar tipos de atendimento", error)
                toast.error("Erro ao carregar tipos de atendimento")
            }
        }
        loadAppointmentTypes()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!patientId || !appointmentTypeId || !dateTime || !professionalId || !value) {
            toast.error("Preencha todos os campos")
            return
        }
        try {
            await createAppointment(
                professionalId,
                Number(patientId),
                Number(appointmentTypeId),
                dateTime,
                paymentStatus,
                appointmentStatus,
                recurring,
                Number(value)
            )
            toastSuccess("Agendamento criado com sucesso!")
            onSuccess()
        } catch (error: any) {
            toastError(error.message)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Select de Paciente */}
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

            {/* Select de Tipo de Atendimento */}
            <div>
                <label className="block mb-1">Tipo de Atendimento</label>
                <Select
                    value={appointmentTypeId ? appointmentTypeId.toString() : ""}
                    onValueChange={(value) => setAppointmentTypeId(Number(value))}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione um tipo" />
                    </SelectTrigger>
                    <SelectContent>
                        {appointmentTypes.map((type) => (
                            <SelectItem key={type.id} value={type.id.toString()}>
                                {type.description}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Data e Hora */}
            <div>
                <label className="block mb-1">Data e Hora</label>
                <Input
                    type="datetime-local"
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                    required
                />
            </div>

            {/* Select de Status de Pagamento */}
            <div>
                <label className="block mb-1">Status de Pagamento</label>
                <Select value={paymentStatus} onValueChange={setPaymentStatus}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="PENDING">Pendente</SelectItem>
                        <SelectItem value="PAID">Pago</SelectItem>
                        <SelectItem value="CANCELED">Cancelado</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Select de Status do Atendimento */}
            <div>
                <label className="block mb-1">Status do Atendimento</label>
                <Select value={appointmentStatus} onValueChange={setAppointmentStatus}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="SCHEDULED">Agendado</SelectItem>
                        <SelectItem value="COMPLETED">Concluído</SelectItem>
                        <SelectItem value="CANCELED">Cancelado</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Checkbox para Recorrente */}
            <div className="flex items-center space-x-2">
                <Checkbox
                    checked={recurring}
                    onCheckedChange={(value) => setRecurring(Boolean(value))}
                />
                <label>Recorrente</label>
            </div>

            {/* Input para Valor */}
            <div>
                <label className="block mb-1">Valor</label>
                <Input
                    type="number"
                    value={value}
                    onChange={(e) => setValue(e.target.value ? Number(e.target.value) : "")}
                    required
                />
            </div>

            <Button type="submit">Criar Agendamento</Button>
        </form>
    )
}
