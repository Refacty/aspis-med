// app/agenda/components/Calendar.tsx
"use client"

import React, { useState, useEffect } from "react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import { fetchAppointments } from "@/lib/api"
import { Appointment } from "@/types/types"
import {DateSelectArg, EventClickArg} from "@fullcalendar/core";
import AppointmentModal from "@/app/(auth-routes)/agenda/components/AppointmentModal";
import FullCalendar from "@fullcalendar/react";

export default function CalendarComponent() {
    const [appointments, setAppointments] = useState<Appointment[]>([])
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
    const [modalOpen, setModalOpen] = useState(false)

    const loadAppointments = async () => {
        try {
            const data = await fetchAppointments()
            setAppointments(data)
        } catch (error) {
            console.error("Error fetching appointments:", error)
        }
    }

    useEffect(() => {
        loadAppointments()
    }, [])

    // Mapeia os atendimentos para os eventos do FullCalendar
    const events = appointments.map((appointment) => ({
        id: appointment.id.toString(),
        title: appointment.patient.name, // Você pode exibir outro campo, como o tipo do atendimento
        date: appointment.dateTime,
        extendedProps: {
            appointment: appointment
        }
    }))

    const handleDateSelect = (selectInfo: DateSelectArg) => {
        // Aqui você pode abrir um formulário para criar um novo atendimento.
        console.log("Selected date:", selectInfo.startStr)
    }

    const handleEventClick = (clickInfo: EventClickArg) => {
        const appointment = clickInfo.event.extendedProps.appointment as Appointment
        setSelectedAppointment(appointment)
        setModalOpen(true)
    }

    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                selectable={true}
                select={handleDateSelect}
                events={events}
                eventClick={handleEventClick}
            />
            {modalOpen && selectedAppointment && (
                <AppointmentModal
                    appointment={selectedAppointment}
                    onClose={() => {
                        setModalOpen(false)
                        setSelectedAppointment(null)
                        loadAppointments()
                    }}
                />
            )}
        </div>
    )
}
