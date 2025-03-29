import axios from "axios"
import toast from "react-hot-toast"
import {Appointment} from "@/types/types";

const token = localStorage.getItem("token");

export async function loginUser(params:any){
        try{
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, params)
            return response.data
        } catch(e){
            throw new Error();
        }
    }

export async function createUser(params:any) {
    try{
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, params)
        return response.data
    } catch(e){
        throw new Error();
    }
}

export async function fetchPatients() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/patients`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    })
    if (!res.ok) throw new Error("Failed to fetch patients")
    return res.json()
}

export async function createPatient(patientData: any) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/patients`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(patientData),
    })
    if (!res.ok) throw new Error("Failed to create patient")
    return res.json()
}

export async function fetchAppointments(): Promise<Appointment[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    if (!res.ok) {
        console.error("Status:", res.status, res.statusText)
        throw new Error("Failed to fetch appointments")
    }
    return res.json()
}

export async function updateAppointment(id: number, updatedData: Partial<Appointment>): Promise<Appointment> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData)
    })
    if (!res.ok) {
        throw new Error("Failed to update appointment")
    }
    return res.json()
}

export async function createAppointment(
    professionalId: number,
    patientId: number,
    dateTime: string
): Promise<Appointment> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ professionalId, patientId, dateTime }),
    });
    if (!res.ok) {
        // Tenta ler a mensagem de erro do corpo da resposta
        const errorData = await res.json();
        throw new Error(errorData.message || "Ocorreu um erro ao criar o agendamento");
    }
    return res.json();
}

