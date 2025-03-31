// app/agenda/components/AppointmentModal.tsx
"use client"

import React, { useState } from "react"
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
import AppointmentForm from "./AppointmentForm"

interface AppointmentModalProps {
    appointment: Appointment
    onClose: () => void
}

export default function AppointmentModal({ appointment, onClose }: AppointmentModalProps) {
    const [editMode, setEditMode] = useState(false)

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Detalhes do Atendimento</DialogTitle>
                    <DialogDescription>
            <span>
              <strong>Paciente:</strong> {appointment.patient.name}
            </span>
                        <br />
                        <span>
              <strong>Data/Hora:</strong> {new Date(appointment.dateTime).toLocaleString()}
            </span>
                        <br />
                        <span>
              <strong>Status:</strong> {appointment.appointmentStatus}
            </span>
                        <br />
                        <span>
              <strong>Pagamento:</strong> {appointment.paymentStatus}
            </span>
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                    {editMode ? (
                        <AppointmentForm appointment={appointment} onSuccess={onClose} />
                    ) : (
                        <Button onClick={() => setEditMode(true)}>Editar Atendimento</Button>
                    )}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Fechar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
