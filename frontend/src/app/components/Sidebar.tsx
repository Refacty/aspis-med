"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useState } from "react"

// Caso tenha uma função auxiliar para lidar com classes condicionalmente
// ex: import { cn } from "@/lib/utils" (ajuste conforme sua estrutura)

const navItems = [
    { label: "Início", href: "/inicio" },
    { label: "Agenda", href: "/agenda" },
    { label: "Pacientes", href: "/pacientes/listagem" },
    { label: "Finanças", href: "/financas" },
    { label: "Despesas", href: "/despesas" },
    { label: "Usuários", href: "/usuarios" },
]

export function Sidebar() {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(true)

    return (
        <div
            className={`
        h-screen border-r
        flex flex-col
        ${isOpen ? "w-64" : "w-20"}
      `}
        >
            <div className="flex items-center justify-between p-4">
                {isOpen && <span className="text-xl font-bold">AspisMed</span>}
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? "<" : ">"}
                </Button>
            </div>

            <nav className="flex-1 space-y-1 px-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`
                block rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-200
                ${isActive ? "bg-gray-300 font-semibold" : "text-gray-700"}
              `}
                        >
                            {item.label}
                        </Link>
                    )
                })}
            </nav>
        </div>
    )
}
