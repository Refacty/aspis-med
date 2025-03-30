"use client"

import React from "react"
import DefaultForm, { Field } from "@/components/DefaultForm"

export default function ExpenseForm(obj?: any) {

  const fields: Field[] = [
    {
      type: "text",
      name: "description",
      label: "Descrição",
      placeholder: "Digite a descrição da despesa",
      defaultValue: "",
      required: true,
    },
    {
      type: "text",
      name: "type",
      label: "Tipo",
      placeholder: "Digite o tipo de despesa (e.g. Aluguel, Material)",
      defaultValue: "",
      required: true,
    },
    {
      type: "number",
      name: "value",
      label: "Valor",
      placeholder: "Digite o valor",
      defaultValue: "",
      required: true,
    },
    {
      type: "date",
      name: "date",
      label: "Data",
      placeholder: "Selecione a data",
      defaultValue: "",
      required: true,
    },
    {
      type: "select",
      name: "paymentStatus",
      label: "Status do Pagamento",
      defaultValue: "PENDING",
      options: [
        { label: "Pendente", value: "PENDING" },
        { label: "Pago", value: "PAID" },
        { label: "Cancelado", value: "CANCELED" },
      ],
      required: true,
    },
  ];

  return (
    <DefaultForm
      endpoint="expenses"
      fields={fields}
      onSuccess={() => {}}
      id={obj?.id}
      route={"despesas"}
      allowDelete={true}
      tittle={"Cadastrar Despesa"}
    />
  );
}
