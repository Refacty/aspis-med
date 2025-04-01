"use client"

import React, { useState } from "react"
import { toastError, toastSuccess } from "@/lib/utils"
import { useRouter } from "next/navigation"
import axios from "axios"
import { useUserContext } from "@/context/UserContext"

export default function ChangePasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const user = useUserContext();

  // Validação do formulário
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!password.trim()) {
      newErrors.password = "Campo obrigatório."
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Função para submeter a troca de senha
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      setIsLoading(true)
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/${user.user?.id}`, { password:password }, {headers: {
          Authorization: `Bearer ${localStorage?.getItem("token") ?? ""}`,
      }}
      )
      toastSuccess("Senha alterada com sucesso!")
      router.push("/inicio")
    } catch (error) {
      toastError("Erro ao alterar a senha.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full p-4 space-y-4 bg-white rounded shadow"
    >
      <h1 className="font-bold text-lg">Alterar Senha</h1>

      <div className="flex flex-col">
        <label htmlFor="password" className="mb-1 font-semibold text-gray-700">
          Nova Senha
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite sua nova senha"
          className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        {errors.password && (
          <small className="mt-1 text-red-500">{errors.password}</small>
        )}
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="confirmPassword"
          className="mb-1 font-semibold text-gray-700"
        >
          Confirmar Senha
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirme sua nova senha"
          className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        {errors.confirmPassword && (
          <small className="mt-1 text-red-500">{errors.confirmPassword}</small>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 mt-2 font-semibold text-white bg-black rounded-lg hover:bg-gray-800 disabled:opacity-50"
        >
          {isLoading ? "Alterando..." : "Alterar Senha"}
        </button>
      </div>
    </form>
  )
}
