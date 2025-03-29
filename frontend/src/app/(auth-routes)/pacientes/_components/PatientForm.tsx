"use client"

import React, { useEffect } from "react"
import DefaultForm, { Field } from "@/components/DefaultForm"

export default function PatientForm(obj?:any){

  const fields: Field[] = [
    {
      type: "text",
      name: "name",
      label: "Nome",
      placeholder: "Digite o nome do paciente",
      defaultValue: "",
      required:true
    },
    {
      type: "text",
      name: "cpf",
      label: "CPF",
      placeholder: "Digite o CPF",
      defaultValue: "",
      mask: 'cpf',
      required:true
    },
    {
      type: "text",
      name: "contact",
      label: "Contato",
      placeholder: "Digite o contato",
      mask: "phone",
      defaultValue: "",
      required:true
    },
    {
      type: "text",
      name: "address",
      label: "Endereço",
      placeholder: "Digite o endereço",
      defaultValue: "",
      required:true
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
      id={obj.id}
      allowDelete={true}
    />
  )
}
