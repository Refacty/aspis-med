// app/agenda/components/AppointmentModal.tsx
"use client"

import React, { useState, useEffect } from "react"
import { Appointment } from "@/types/types"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { updateAppointment, fetchAppointmentTypes, deleteAppointment } from "@/lib/api"
import toast from "react-hot-toast"
import {AppointmentStatusMap, PaymentStatusMap} from "@/lib/utils";
import {Input} from "@/components/ui/input";

interface AppointmentModalProps {
    appointment: Appointment
    onClose: () => void
}

export default function AppointmentModal({ appointment, onClose }: AppointmentModalProps) {
    const [editMode, setEditMode] = useState(false)
    const [appointmentTypes, setAppointmentTypes] = useState([])
    const [selectedAppointmentType, setSelectedAppointmentType] = useState<number | "">("")
    const [selectedPaymentStatus, setSelectedPaymentStatus] = useState(appointment.paymentStatus)
    const [selectedAppointmentStatus, setSelectedAppointmentStatus] = useState(appointment.appointmentStatus)
    const [value, setValue] = useState(appointment.value)

    useEffect(() => {
        // Carregar os tipos de atendimento do backend
        const loadAppointmentTypes = async () => {
            try {
                const data = await fetchAppointmentTypes()
                setAppointmentTypes(data)
                setSelectedAppointmentType(appointment.appointmentType!!.id)
            } catch (error) {
                toast.error("Erro ao carregar tipos de atendimento")
            }
        }
        loadAppointmentTypes()
    }, [appointment])

    const handleSave = async () => {
        try {
            await updateAppointment(appointment.id, {
                appointmentTypeId: selectedAppointmentType,
                dateTime: appointment.dateTime,
                paymentStatus: selectedPaymentStatus,
                appointmentStatus: selectedAppointmentStatus,
                value: value
            })
            toast.success("Atendimento atualizado com sucesso!")
            onClose()
        } catch (error) {
            toast.error("Erro ao atualizar o atendimento.")
        }
    }

    const handleDelete = async () => {
        try {
            await deleteAppointment(appointment.id)
            toast.success("Atendimento excluído com sucesso!")
            onClose()
        } catch (error) {
            toast.error("Erro ao excluir o atendimento.")
        }
    }

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Detalhes do Atendimento</DialogTitle>
                    <DialogDescription>
                    <span>
                        <strong>Paciente:</strong> {appointment.patient.name}
                    </span><br />
                    <span>
                        <strong>Data/Hora:</strong> {new Date(appointment.dateTime).toLocaleString()}
                    </span><br />
                    <span>
                        <strong>Duração:</strong> {appointment.appointmentType?.defaultDuration} minutos
                    </span><br />
                    <span>
                        <strong>Status do Atendimento:</strong> {AppointmentStatusMap[appointment.appointmentStatus]}
                    </span><br />
                    <span>
                        <strong>Status de Pagamento:</strong> {PaymentStatusMap[appointment.paymentStatus]}
                    </span><br />
                    <span>
                        <strong>Valor:</strong> {appointment.value}
                    </span><br/>
                    </DialogDescription>
                </DialogHeader>

                {editMode ? (
                    <div className="space-y-4">
                        {/* Tipo de Atendimento */}
                        <div>
                            <label className="block mb-1">Tipo de Atendimento</label>
                            <Select
                                value={selectedAppointmentType ? selectedAppointmentType.toString() : ""}
                                onValueChange={(value) => setSelectedAppointmentType(Number(value))}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione o tipo de atendimento" />
                                </SelectTrigger>
                                <SelectContent>
                                    {appointmentTypes.map((type:any) => (
                                        <SelectItem key={type.id} value={type.id.toString()}>
                                            {type.description}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Status de Pagamento */}
                        <div>
                            <label className="block mb-1">Status de Pagamento</label>
                            <Select value={selectedPaymentStatus} onValueChange={setSelectedPaymentStatus}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione o status de pagamento" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="PENDING">Pendente</SelectItem>
                                    <SelectItem value="PAID">Pago</SelectItem>
                                    <SelectItem value="CANCELED">Cancelado</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Status do Atendimento */}
                        <div>
                            <label className="block mb-1">Status do Atendimento</label>
                            <Select value={selectedAppointmentStatus} onValueChange={setSelectedAppointmentStatus}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione o status do atendimento" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="SCHEDULED">Agendado</SelectItem>
                                    <SelectItem value="COMPLETED">Concluído</SelectItem>
                                    <SelectItem value="CANCELED">Cancelado</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Valor */}
                        <div>
                            <label className="block mb-1">Valor</label>
                            <Input
                                type="number"
                                value={value}
                                onChange={(e:any) => setValue(e.target.value)}
                                required
                            />
                        </div>

                        <Button onClick={handleSave}>Salvar Alterações</Button>
                        <Button variant="destructive" onClick={handleDelete}>Excluir Atendimento</Button>
                    </div>
                ) : (
                    <Button onClick={() => setEditMode(true)}>Editar Atendimento</Button>
                )}
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Fechar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
