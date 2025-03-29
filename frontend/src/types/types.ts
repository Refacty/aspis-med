// /types/types.ts

export interface Patient {
    id: number
    name: string
    cpf: string
    contact: string
    address: string
    observations: string
    registrationDate: Date
}

// Definindo o tipo Appointment, usando o Patient já existente:
export interface Appointment {
    id: number
    professional: {
        id: number
        name: string
    }
    patient: Patient
    appointmentType?: AppointmentType
    dateTime: string  // ou Date, mas geralmente vem como ISO string do backend
    paymentStatus: string
    appointmentStatus: string
    recurring: boolean
    value: number
}

export interface AppointmentType {
    id: number
    description: string
    defaultValue: number
    defaultDuration: number
}
