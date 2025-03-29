"use client"

import React, { useState, useEffect } from "react"
import axios from "axios"
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  type PaginationState
} from "@tanstack/react-table"
import { CaretUp, CaretDown, Pencil, Plus, TrashSimple } from "@phosphor-icons/react"
import { toastError, toastSuccess } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { toastConfirm } from "@/app/components/toastConfirm"

interface ListagemProps<T> {
  endpoint: string
  columns: ColumnDef<T>[]
  initialQuery?: string
  showCreate?: boolean
  title?: string
  itemName?: string
}

export function DefaultList<T extends object>({
  endpoint,
  columns,
  initialQuery = '',
  showCreate = true,
  title,
  itemName = 'registro'
}: ListagemProps<T>) {
  const router = useRouter()
  const [data, setData] = useState<T[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  })

  const fetchData = async () => {
    try {
      setIsLoading(true)
      
      const params = {
        page: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
        ...Object.fromEntries(new URLSearchParams(initialQuery))
      }

      const url = `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`
      const response = await axios.get(url, {
        params,
        headers: {
          Authorization: `Bearer ${localStorage?.getItem("token") ?? ""}`
        }
      })

      // Ajuste para a resposta direta da API
      if (Array.isArray(response.data)) {
        setData(response.data)
        setTotalCount(response.data.length)
      } else {
        throw new Error('Formato de dados inválido')
      }
    } catch (err) {
      setError('Erro ao carregar dados')
      toastError(`Falha ao carregar ${itemName}s`)
      setData([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [pagination, sorting, initialQuery])

  const actionColumn: ColumnDef<T> = {
    id: 'actions',
    header: 'Ações',
    cell: ({ row }) => (
      <div className="flex gap-2">
        <button
          onClick={() => router.push(`/${itemName}s/${(row.original as any).id}`)}
          className="p-1 text-blue-600 hover:text-blue-800 cursor-pointer"
          title="Editar"
        >
          <Pencil className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleDelete((row.original as any).id)}
          className="p-1 text-red-600 hover:text-red-800 cursor-pointer"
          title="Excluir"
        >
          <TrashSimple className="w-5 h-5" />
        </button>
      </div>
    )
  }

  const table = useReactTable({
    data,
    columns: [...columns, actionColumn],
    state: { sorting, pagination },
    manualPagination: true,
    pageCount: Math.ceil(totalCount / pagination.pageSize),
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
  })

  const handleDelete = async (id: string | number) => {
    const confirm = await toastConfirm(`Confirmar exclusão deste ${itemName}?`)
    if (!confirm) return

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage?.getItem("token") ?? ""}`
        }
      })
      
      toastSuccess(`${itemName} excluído com sucesso!`)
      fetchData()
    } catch (err) {
      toastError(`Falha ao excluir ${itemName}`)
    }
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          {title || `${itemName}s`}
        </h1>
        
        {showCreate && (
          <button
            onClick={() => router.push(`/${itemName}s/`)}
            className="flex items-center px-4 py-2 text-white bg-black rounded-lg hover:bg-gray-800"
          >
            <Plus className="w-5 h-5 mr-2" />
            Criar {itemName}
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className="border-b">
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left text-gray-600 cursor-pointer"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getIsSorted() && (
                        header.column.getIsSorted() === 'asc' ? 
                        <CaretUp className="w-4 h-4 ml-1" /> : 
                        <CaretDown className="w-4 h-4 ml-1" />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          
          <tbody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <tr key={row.id} className="border-b hover:bg-gray-50">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-4 py-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1} className="py-4 text-center">
                  {isLoading ? 'Carregando...' : 'Nenhum registro encontrado'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-600">
          Exibindo {pagination.pageIndex * pagination.pageSize + 1} a{' '}
          {Math.min((pagination.pageIndex + 1) * pagination.pageSize, totalCount)} de{' '}
          {totalCount} registros
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Próximo
          </button>
        </div>
      </div>
    </div>
  )
}