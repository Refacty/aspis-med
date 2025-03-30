"use client"

import React, { useEffect } from "react"
import DefaultForm, { Field } from "@/components/DefaultForm"

export default function AppointmentTypeForm({ obj }: { obj?: any }) {

  const fields: Field[] = [
    {
      type: "text",
      name: "id",
      label: "ID",
      placeholder: "",
      defaultValue: "",
      required: false,
      disabled: true,
    },
    {
      type: "text",
      name: "description",
      label: "Descrição",
      placeholder: "Digite a descrição",
      defaultValue: "",
      required: true,
    },
    {
      type: "number",
      name: "defaultValue",
      label: "Valor Padrão",
      placeholder: "0.00",
      defaultValue: "",
      required: true,
    },
    {
      type: "number",
      name: "defaultDuration",
      label: "Duração Padrão (min)",
      placeholder: "Ex: 30",
      defaultValue: "",
      required: true,
    },
  ]

  return (
    <DefaultForm
      endpoint="appointment-types"
      fields={fields}
      route={'tipo-agendamento'}
      onSuccess={() => {}}
      id={obj}
      allowDelete={true}
    />
  )
}
