"use client"

import { DefaultList } from "@/components/DefaultList"

interface Paciente {
  id: number
  name: string
  cpf: string
  contact: string
  address: string
  registrationDate: string
}

const columns = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "cpf",
    header: "CPF",
  },
  {
    accessorKey: "contact",
    header: "Telefone",
  },
  {
    accessorKey: "address",
    header: "Endereço",
  },
  {
    accessorKey: "registrationDate",
    header: "Data de Cadastro",
    cell: ({ row }: any) => new Date(row.getValue('registrationDate')).toLocaleDateString()
  },
]

export default function PacientesPage() {
  return (
    <div className="container mx-auto p-4">
      <DefaultList<Paciente>
        endpoint="patients"
        columns={columns}
        title="Listagem de Pacientes"
        route="pacientes"
        itemName="paciente"
        showCreate={true}
      />
    </div>
  )
}