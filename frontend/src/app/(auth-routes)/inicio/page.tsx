// app/inicio/page.tsx
"use client"

import React, { useEffect, useState } from "react"
import DashboardCard from "./components/DashboardCard"
import QuickActions from "./components/QuickActions"
import {useUserContext} from "@/context/UserContext";
import axios from "axios";

export default function HomePage() {
    const {user} = useUserContext()
    const [dashData, setDashData] = useState<any>(null);

    function formatToBrazilianCurrency(value: number): string {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
    

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/appointments/dashboard`, {
                headers: {
                    Authorization: `Bearer ${localStorage?.getItem("token") ?? ""}`,
              }
        }).then((r:any) => {
            setDashData(r.data)
        })
    }, [])

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Bem-vindo(a), {user?.name}!</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <DashboardCard title="Atendimentos Hoje" value={dashData?.atendimentosHoje} />
                <DashboardCard title="Receitas do Mês" value={formatToBrazilianCurrency(dashData?.receitasPorMes ?? 0)} />
                <DashboardCard title="Despesas do Mês" value={formatToBrazilianCurrency(dashData?.despesasPorMes ?? 0)} />
            </div>
            <QuickActions />
        </div>
    )
}
