"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createUser } from "@/lib/api"
import { useUserContext } from "@/context/UserContext"

function formatCPF(value: string): string {
  let digits = value.replace(/\D/g, "")
  digits = digits.substring(0, 11)
  if (digits.length <= 3) return digits
  if (digits.length <= 6) {
    return digits.substring(0, 3) + "." + digits.substring(3)
  }
  if (digits.length <= 9) {
    return (
      digits.substring(0, 3) +
      "." +
      digits.substring(3, 6) +
      "." +
      digits.substring(6)
    )
  }
  return (
    digits.substring(0, 3) +
    "." +
    digits.substring(3, 6) +
    "." +
    digits.substring(6, 9) +
    "-" +
    digits.substring(9, 11)
  )
}

function formatPhone(value: string): string {
  let digits = value.replace(/\D/g, "")
  digits = digits.substring(0, 11)
  if (digits.length <= 2) return "(" + digits
  if (digits.length <= 6) {
    return "(" + digits.substring(0, 2) + ") " + digits.substring(2)
  }
  if (digits.length <= 10) {
    return (
      "(" +
      digits.substring(0, 2) +
      ") " +
      digits.substring(2, 6) +
      "-" +
      digits.substring(6)
    )
  }
  return (
    "(" +
    digits.substring(0, 2) +
    ") " +
    digits.substring(2, 7) +
    "-" +
    digits.substring(7)
  )
}

// 2) Defina a interface do DTO (opcional)
interface UserCreateDTO {
  name: string
  email: string
  cpf: string
  whatsapp: string
  password: string
  adress: string
}

export default function RegisterForm() {
  const router = useRouter()
  const {user, setUser} = useUserContext();

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [cpf, setCpf] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [password, setPassword] = useState("")
  const [adress, setAdress] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!name || !email || !cpf || !whatsapp || !password || !adress) {
      alert("Preencha todos os campos obrigatórios.")
      return
    }

    try {
      const newUser: UserCreateDTO = {
        name,
        email,
        cpf,
        whatsapp,
        password,
        adress,
      }

      const response = await createUser(newUser) 
      setUser(response.user);
      router.push("/inicio")   
    } catch (error) {
      return;
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-semibold">Nome *</label>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Seu nome completo"
          required
        />
      </div>

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
        <label className="block mb-1 font-semibold">CPF *</label>
        <Input
          type="text"
          value={cpf}
          onChange={(e) => setCpf(formatCPF(e.target.value))}
          placeholder="000.000.000-00"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Whatsapp *</label>
        <Input
          type="text"
          value={whatsapp}
          onChange={(e) => setWhatsapp(formatPhone(e.target.value))}
          placeholder="(99) 9 9999-9999"
          required
        />
      </div>

      {/* PASSWORD */}
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

      <div>
        <label className="block mb-1 font-semibold">Endereço *</label>
        <Input
          type="text"
          value={adress}
          onChange={(e) => setAdress(e.target.value)}
          placeholder="Rua, Número, Bairro, Cidade"
          required
        />
      </div>

      <Button type="submit" className="w-full">
        Criar Conta
      </Button>
    </form>
  )
}
