"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { CaretUp, CaretDown } from "@phosphor-icons/react"
import { DateTime } from "luxon"
import { toastError } from "@/lib/utils"

interface FinancialReport {
  tipo: string
  data: string
  descricao: string
  valor: number
  statusPagamento: string
}

export default function page() {
  const [data, setData] = useState<FinancialReport[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Datas padrão: início e fim do mês atual
  const [startDate, setStartDate] = useState<string>(() => 
    DateTime.now().startOf('month').toISODate()
  )
  const [endDate, setEndDate] = useState<string>(() => 
    DateTime.now().endOf('month').toISODate()
  )

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/expenses/report`, {
        params: {
          startDate,
          endDate
        },
        headers: {
          Authorization: `Bearer ${localStorage?.getItem("token") ?? ""}`
        }
      })

      setData(response.data)
    } catch (err) {
      setError("Falha ao carregar relatório")
      toastError("Não foi possível carregar os dados financeiros")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [startDate, endDate])

  const columns = [
    { header: "Tipo", accessor: "tipo" },
    { header: "Data", accessor: "data" },
    { header: "Descrição", accessor: "descricao" },
    { header: "Valor", accessor: "valor" },
    { header: "Status", accessor: "statusPagamento" }
  ]

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">
          Relatório Financeiro
        </h1>
        
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">De:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="px-3 py-2 border rounded-md"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Até:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="px-3 py-2 border rounded-md"
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">
          {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              {columns.map((column) => (
                <th
                  key={column.accessor}
                  className="px-4 py-3 text-left text-gray-600"
                >
                  <div className="flex items-center">
                    {column.header}
                    {/* Exemplo de ordenação (opcional) */}
                    <button className="ml-1">
                      <CaretUp className="w-4 h-4" />
                      <CaretDown className="w-4 h-4 -mt-1" />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="py-4 text-center">
                  Carregando...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="py-4 text-center">
                  Nenhum registro encontrado
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">
                    {item.tipo === 'receita' ? '📈 Receita' : '📉 Despesa'}
                  </td>
                  <td className="px-4 py-3">
                    {DateTime.fromISO(item.data).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">{item.descricao}</td>
                  <td className={`px-4 py-3 font-medium ${
                    item.valor < 0 ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {item.valor.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-sm rounded-full bg-gray-100">
                      {item.statusPagamento}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-600">
          Total de registros: {data.length}
        </div>
        
        <div className="text-sm text-gray-600">
          Período selecionado: {DateTime.fromISO(startDate).toLocaleString()} -{' '}
          {DateTime.fromISO(endDate).toLocaleString()}
        </div>
      </div>
    </div>
  )
}