// app/pacientes/components/PatientTable.tsx
"use client"

import { Patient } from "@/types/types"
import { Button } from "@/components/ui/button"

type PatientTableProps = {
    patients: Patient[]
}

export default function PatientTable({ patients }: PatientTableProps) {
    return (
        <table className="min-w-full border">
            <thead>
            <tr className="border-b">
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">CPF</th>
                <th className="py-2 px-4 text-left">Contact</th>
                <th className="py-2 px-4 text-left">Actions</th>
            </tr>
            </thead>
            <tbody>
            {patients.map((patient) => (
                <tr key={patient.id} className="border-b">
                    <td className="py-2 px-4">{patient.name}</td>
                    <td className="py-2 px-4">{patient.cpf}</td>
                    <td className="py-2 px-4">{patient.contact}</td>
                    <td className="py-2 px-4">
                        <Button variant="outline">View</Button>
                        <Button variant="outline" className="ml-2">Edit</Button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}
