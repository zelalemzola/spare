"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "./ui/chart"



const data = [
    {
        name: "Jan",
        total: 2400,
        profit: 1100,
    },
    {
        name: "Feb",
        total: 1398,
        profit: 600,
    },
    {
        name: "Mar",
        total: 9800,
        profit: 2800,
    },
    {
        name: "Apr",
        total: 3908,
        profit: 1300,
    },
    {
        name: "May",
        total: 4800,
        profit: 1800,
    },
    {
        name: "Jun",
        total: 3800,
        profit: 1600,
    },
    {
        name: "Jul",
        total: 4300,
        profit: 2100,
    },
]

export function Overview() {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value:any) => `$${value}`}
                />
                <Tooltip
                    formatter={(value: number) => [`$${value}`, undefined]}
                    labelFormatter={(label:any) => `Month: ${label}`}
                />
                <Legend />
                <Bar dataKey="total" name="Total Sales" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="profit" name="Profit" fill="hsl(var(--primary-foreground))" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    )
}

