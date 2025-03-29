// app/inicio/components/DashboardCard.tsx
"use client"

type DashboardCardProps = {
    title: string
    value: number | string
}

export default function DashboardCard({ title, value }: DashboardCardProps) {
    return (
        <div className="border rounded p-4">
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-2xl">{value}</p>
        </div>
    )
}
