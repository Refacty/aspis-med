// app/entrar/components/LoginForm.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"   // Exemplo de shadcn/ui
import { Input } from "@/components/ui/input"
import { loginUser } from "@/lib/api"             // Exemplo de função para login no backend

export default function LoginForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const token = await loginUser(email, password)
            // Salvar token (localStorage, cookies, etc.)
            localStorage.setItem("token", token)
            router.push("/inicio")
        } catch (error) {
            alert("Invalid credentials.")
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block mb-1">E-mail</label>
                <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label className="block mb-1">Password</label>
                <Input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <Button type="submit" className="w-full">
                Login
            </Button>
        </form>
    )
}
