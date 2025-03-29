// lib/api.ts
export async function loginUser(email: string, password: string): Promise<string> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    })

    if (!res.ok) {
        throw new Error("Failed to login")
    }

    const data = await res.text() // ou .json(), dependendo de como o backend retorna
    return data // supondo que seja apenas o token
}

export async function fetchPatients() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/patients`)
    if (!res.ok) throw new Error("Failed to fetch patients")
    return res.json()
}

export async function createPatient(patientData: any) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/patients`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(patientData),
    })
    if (!res.ok) throw new Error("Failed to create patient")
    return res.json()
}

