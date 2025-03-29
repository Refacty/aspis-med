"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { loginUser } from "@/lib/api"
import toast from "react-hot-toast"
import { useUserContext } from "@/context/UserContext"

export default function LoginForm() {
    const router = useRouter()
    const { setUser } = useUserContext()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!email || !password) {
            toast.error("Preencha todos os campos obrigatórios.")
            return
        }

        try {
            // Exemplo: loginUser retorna { user, token }
            const response = await loginUser({ email, password })
            // Salva user no contexto (e no localStorage)
            setUser(response.user)

            // Se quiser também salvar token, ou gerenciar via interceptores
            localStorage.setItem("token", response.token)

            router.push("/inicio")
        } catch (error) {
            toast.error("Erro ao realizar login. Verifique suas credenciais.")
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campos de email e senha */}
            <div>
                <label className="block mb-1 font-semibold">E-mail *</label>
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seuemail@exemplo.com"
                    required
                />
            </div>
            <div>
                <label className="block mb-1 font-semibold">Senha *</label>
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digite sua senha"
                    required
                />
            </div>

            <Button type="submit" className="w-full">
                Entrar
            </Button>
        </form>
    )
}
