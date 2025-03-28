// app/inicio/page.tsx
"use client"

import React from "react"
import DashboardCard from "./components/DashboardCard"
import QuickActions from "./components/QuickActions"
import {useUserContext} from "@/context/UserContext";

export default function HomePage() {
    const {user} = useUserContext()
    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Bem-vindo(a), {user?.name}!</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <DashboardCard title="Atendimentos Hoje" value={5} />
                <DashboardCard title="Receitas do Mês" value={"R$ 2.000,00"} />
                <DashboardCard title="Despesas do Mês" value={"R$ 1.000,00"} />
            </div>
            <QuickActions />
        </div>
    )
}
