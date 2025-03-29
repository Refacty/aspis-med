// lib/api.ts
export async function loginUser(email: string, password: string): Promise<string> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login`, {
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
