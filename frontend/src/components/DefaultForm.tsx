"use client"

import React, { useEffect, useState } from "react"
import axios, { AxiosResponse } from "axios"

// Funções auxiliares de máscara:
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

// Aplica máscara se necessário
function applyMask(value: string, mask?: "cpf" | "phone"): string {
  if (!mask) return value
  switch (mask) {
    case "cpf":
      return formatCPF(value)
    case "phone":
      return formatPhone(value)
    default:
      return value
  }
}

// Tipagem para cada campo do formulário
export interface Field {
  name: string
  label: string
  type?: string
  placeholder?: string
  defaultValue?: string
  required?: boolean
  minLength?: number
  maxLength?: number
  disabled?: boolean
  mask?: "cpf" | "phone"
}

// Props gerais do form
interface Props {
  /** Ex: "usuarios", "pacientes", etc. Usado para GET/POST/PUT/DELETE. */
  endpoint: string

  /** Lista de campos a exibir no formulário. */
  fields: Field[]

  /** ID opcional para entrar em modo edição. */
  id?: string

  /** Se true, mostra botão de excluir caso haja id. */
  allowDelete?: boolean

  /** Função executada em caso de sucesso na requisição. */
  onSuccess: () => void
}

function DefaultForm({ endpoint, fields, id, allowDelete, onSuccess }: Props) {
  // Monta estado inicial a partir dos defaultValues
  const initialFormState = fields.reduce((acc: Record<string, string>, field) => {
    acc[field.name] = field.defaultValue || ""
    return acc
  }, {})

  const [formData, setFormData] = useState<Record<string, string>>(initialFormState)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  // Cabeçalho de autenticação (opcional)
  const headers = {
    Authorization: `Bearer ${localStorage?.getItem("token") ?? ""}`,
  }

  /**
   * Se receber `id`, faz um GET na API para buscar dados e preencher o form
   */
  useEffect(() => {
    if (!id) return

    const fetchEntity = async () => {
      try {
        setIsLoading(true)
        const url = `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}/${id}`
        console.log(url)
        const response: AxiosResponse<any> = await axios.get(url, { headers })
        const data = response.data


        // Monta novo estado do form, aplicando máscara se for o caso
        const updatedFormData = { ...formData }
        fields.forEach((field) => {
          if (data[field.name] !== undefined && data[field.name] !== null) {
            updatedFormData[field.name] = applyMask(String(data[field.name]), field.mask)
          }
        })

        setFormData(updatedFormData)
      } catch (error) {
        console.error("Erro ao buscar registro:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEntity()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]) // só re-fetch se mudar o id

  // Lida com mudanças no input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const fieldDef = fields.find((f) => f.name === name)
    const maskedValue = applyMask(value, fieldDef?.mask)
    setFormData((prev) => ({ ...prev, [name]: maskedValue }))
  }

  // Faz a validação de campos (required, minLength, maxLength)
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    fields.forEach((field) => {
      const value = formData[field.name] || ""

      if (field.required && !value.trim()) {
        newErrors[field.name] = "Campo obrigatório."
      }
      if (field.minLength && value.length < field.minLength) {
        newErrors[field.name] = `Mínimo de ${field.minLength} caracteres.`
      }
      if (field.maxLength && value.length > field.maxLength) {
        newErrors[field.name] = `Máximo de ${field.maxLength} caracteres.`
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Submit do formulário -> se tiver id, faz PUT; senão, POST
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      setIsLoading(true)
      const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`

      if (id) {
        // Edição
        await axios.put(`${fullUrl}/${id}`, formData, { headers })
      } else {
        // Criação
        await axios.post(fullUrl, formData, { headers })
      }

      onSuccess()
    } catch (error) {
      console.error("Erro na requisição:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Handler para deletar
  const handleDelete = async () => {
    if (!id) return
    const confirma = confirm("Tem certeza que deseja excluir este registro?")
    if (!confirma) return

    try {
      setIsLoading(true)
      const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}/${id}`
      await axios.delete(fullUrl, { headers })
      onSuccess()
    } catch (error) {
      console.error("Erro ao excluir:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full p-4 space-y-4 bg-white rounded shadow"
    >
      {fields.map((field) => {
        const { name, label, type, placeholder, required, disabled } = field
        const value = formData[name] || ""

        return (
          <div key={name} className="flex flex-col">
            <label htmlFor={name} className="mb-1 font-semibold text-gray-700">
              {label} {required ? "*" : ""}
            </label>

            <input
              id={name}
              name={name}
              type={type || "text"}
              placeholder={placeholder || ""}
              value={value}
              onChange={handleChange}
              disabled={disabled || isLoading}
              className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            {/* Se existir mensagem de erro para esse campo, exibimos */}
            {errors[name] && (
              <small className="mt-1 text-red-500">{errors[name]}</small>
            )}
          </div>
        )
      })}

      <div className="flex items-center space-x-2">
        {/* Botão principal: Criar ou Atualizar */}
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 mt-2 font-semibold text-white bg-black rounded-lg hover:bg-gray-800 disabled:opacity-50"
        >
          {id ? "Atualizar" : "Criar"}
        </button>

        {/* Se estivermos em modo edição e allowDelete=true, exibe botão de excluir */}
        {id && allowDelete && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={isLoading}
            className="px-4 py-2 mt-2 font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50"
          >
            Excluir
          </button>
        )}
      </div>
    </form>
  )
}

export default DefaultForm
