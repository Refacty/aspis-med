// app/pacientes/components/PatientForm.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createPatient } from "@/lib/api"

type PatientFormProps = {
    onPatientCreated: () => void
}

export default function PatientForm({ onPatientCreated }: PatientFormProps) {
    const [name, setName] = useState("")
    const [cpf, setCpf] = useState("")
    const [contact, setContact] = useState("")
    const [address, setAddress] = useState("")
    const [observations, setObservations] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            await createPatient({ name, cpf, contact, address, observations })
            onPatientCreated()
            setName("")
            setCpf("")
            setContact("")
            setAddress("")
            setObservations("")
        } catch (error) {
            console.error("Error creating patient:", error)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label>Name</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label>CPF</label>
                <Input value={cpf} onChange={(e) => setCpf(e.target.value)} />
            </div>
            <div>
                <label>Contact</label>
                <Input value={contact} onChange={(e) => setContact(e.target.value)} />
            </div>
            <div>
                <label>Address</label>
                <Input value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <div>
                <label>Observations</label>
                <textarea
                    className="w-full border rounded p-2"
                    rows={4}
                    value={observations}
                    onChange={(e) => setObservations(e.target.value)}
                />
            </div>
            <Button type="submit">Save Patient</Button>
        </form>
    )
}
