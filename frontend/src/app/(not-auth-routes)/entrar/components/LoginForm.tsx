"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { loginUser } from "@/lib/api"
import toast from "react-hot-toast"
import { useUserContext } from "@/context/UserContext"

export default function LoginForm() {
  const router = useRouter()
   const {user, setUser} = useUserContext();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!email || !password) {
      toast.error("Preencha todos os campos obrigatórios.")
      return
    }

    try {
      const response = await loginUser({ email, password })
      setUser(response.user)
      router.push("/inicio")
    } catch (error) {
    toast.error("Erro ao realizar login. Verifique suas credenciais.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
