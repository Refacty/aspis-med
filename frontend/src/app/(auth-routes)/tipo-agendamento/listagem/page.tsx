"use client"

import { DefaultList } from "@/components/DefaultList"

interface AppointmentType {
  id: number
  description: string
  defaultValue: number
  defaultDuration: number
}

const columns = [
  {
    accessorKey: "description",
    header: "Descrição",
  },
  {
    accessorKey: "defaultValue",
    header: "Valor Padrão",
    cell: ({ row }: any) =>
      row.getValue("defaultValue")?.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
  },
  {
    accessorKey: "defaultDuration",
    header: "Duração Padrão",
    cell: ({ row }: any) => `${row.getValue("defaultDuration")} min`,
  },
]

export default function AppointmentTypesPage() {
  return (
    <div className="container mx-auto p-4">
      <DefaultList<AppointmentType>
        endpoint="appointment-types"
        columns={columns}
        title="Tipos de Agendamento"
        itemName="tipo de agendamento"
        showCreate={true}
        route="tipo-agendamento"
      />
    </div>
  )
}
