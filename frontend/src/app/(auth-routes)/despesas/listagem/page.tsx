"use client"

import { DefaultList } from "@/components/DefaultList"

interface Expense {
  id: number
  description: string
  type: string
  value: number
  date: string
  paymentStatus: string
}

const columns = [
  {
    accessorKey: "description",
    header: "Descrição",
  },
  {
    accessorKey: "type",
    header: "Tipo",
  },
  {
    accessorKey: "value",
    header: "Valor",
    cell: ({ row }: any) => `R$ ${row.getValue("value").toFixed(2).replace('.', ',')}`,
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row }: any) => new Date(row.getValue("date")).toLocaleDateString(),
  },
  {
    accessorKey: "paymentStatus",
    header: "Status",
    cell: ({ row }: any) => {
      const status = row.getValue("paymentStatus");
      switch (status) {
        case "PENDING":
          return "Pendente";
        case "PAID":
          return "Pago";
        case "CANCELED":
          return "Cancelado";
        default:
          return status;
      }
    },
  },
]

export default function DespesasPage() {
  return (
    <div className="container mx-auto p-4">
      <DefaultList<Expense>
        endpoint="expenses"
        columns={columns}
        title="Listagem de Despesas"
        route="despesas"
        itemName="despesa"
        showCreate={true}
      />
    </div>
  )
}
