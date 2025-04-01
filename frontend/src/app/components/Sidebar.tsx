"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Home, Calendar, Users, Clock, DollarSign, Wallet } from "lucide-react" // Adicione os ícones apropriados

const navItems = [
    { label: "Início", href: "/inicio", icon: Home },
    { label: "Agenda", href: "/agenda", icon: Calendar },
    { label: "Pacientes", href: "/pacientes/listagem", icon: Users },
    { label: "Tipo de Agendamento", href: "/tipo-agendamento/listagem", icon: Clock },
    { label: "Finanças", href: "/financas", icon: DollarSign },
    { label: "Despesas", href: "/despesas/listagem", icon: Wallet },
]

export function Sidebar() {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(true)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
            if (window.innerWidth >= 768) {
                setIsOpen(true)
            }
        }

        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    return (
        <>
            {/* Mobile Hamburger Button */}
            {isMobile && !isOpen && (
                <button
                    className="fixed left-4 top-4 z-50 p-2 md:hidden"
                    onClick={() => setIsOpen(true)}
                >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            )}

            {/* Overlay */}
            {isMobile && isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={`
                    fixed inset-y-0 left-0 z-50 h-screen border-r bg-white
                    flex flex-col transform transition-all duration-300 ease-in-out
                    md:relative md:translate-x-0
                    ${isMobile
                        ? (isOpen ? "translate-x-0 w-64" : "-translate-x-full")
                        : (isOpen ? "w-64" : "w-20")
                    }
                `}
            >
                <div className="flex items-center justify-between p-4">
                    {isOpen && <span className="text-xl font-bold">AspisMed</span>}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                            if (isMobile) {
                                setIsOpen(false)
                            } else {
                                setIsOpen(!isOpen)
                            }
                        }}
                    >
                        {isMobile ? (
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : isOpen ? (
                            "<"
                        ) : (
                            ">"
                        )}
                    </Button>
                </div>

                <nav className="flex-1 space-y-1 px-2">
                    {navItems.map(({ label, href, icon: Icon }) => {
                        const isActive = pathname === href
                        return (
                            <Link
                                key={href}
                                href={href}
                                onClick={() => isMobile && setIsOpen(false)}
                                className={`
                                    flex items-center rounded-md p-3 gap-3 text-sm font-medium hover:bg-gray-200
                                    ${isActive ? "bg-gray-300 font-semibold" : "text-gray-700"}
                                    ${!isOpen ? "justify-center" : ""}
                                `}
                            >
                                <Icon className="h-5 w-5 flex-shrink-0" />
                                <span className={`
                                    transition-opacity duration-200
                                    ${isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 hidden"}
                                `}>
                                    {label}
                                </span>
                            </Link>
                        )
                    })}
                </nav>
            </div>
        </>
    )
}