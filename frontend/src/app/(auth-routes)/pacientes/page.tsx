// app/pacientes/page.tsx
"use client"

import React, { useEffect, useState } from "react"
import PatientTable from "./components/PatientTable"
import PatientForm from "./components/PatientForm"
import { fetchPatients } from "@/lib/api"

export default function PatientsPage() {
    const [patients, setPatients] = useState([])

    const getAllPatients = async () => {
        try {
            const data = await fetchPatients()
            setPatients(data)
        } catch (error) {
            console.error("Error fetching patients:", error)
        }
    }

    useEffect(() => {
        getAllPatients()
    }, [])

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Pacientes</h1>
            <div className="mb-6">
                <PatientForm onPatientCreated={getAllPatients} />
            </div>
            <PatientTable patients={patients} />
        </div>
    )
}
