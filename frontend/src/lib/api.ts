import axios from "axios"
import toast from "react-hot-toast"


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

