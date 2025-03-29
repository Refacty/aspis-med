"use client"

import React from "react"
import DefaultForm, { Field } from "@/components/DefaultForm"

export default function PatientForm(id?:any){

  const fields: Field[] = [
    {
      type: "text",
      name: "name",
      label: "Nome",
      placeholder: "Digite o nome do paciente",
      defaultValue: "",
    },
    {
      type: "text",
      name: "cpf",
      label: "CPF",
      placeholder: "Digite o CPF",
      defaultValue: "",
      mask: 'cpf'
    },
    {
      type: "text",
      name: "contact",
      label: "Contato",
      placeholder: "Digite o contato",
      mask: "phone",
      defaultValue: "",
    },
    {
      type: "text",
      name: "address",
      label: "Endereço",
      placeholder: "Digite o endereço",
      defaultValue: "",
    },
    {
      type: "text",
      name: "observação",
      label: "Observação",
      placeholder: "Digite as observações",
      defaultValue: "",
    },
  ]


  return (
    <DefaultForm
      endpoint="patients"  
      fields={fields}
      onSuccess={() => {}} 
      allowDelete={true}
    />
  )
}
