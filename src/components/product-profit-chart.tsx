"use client"

import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    ChartTooltipContent,
    ChartContainer,
} from "@/components/ui/chart"

const data = [
    {
        name: "Brake Pads",
        revenue: 4500,
        profit: 1800,
        margin: 40,
    },
    {
        name: "Oil Filters",
        revenue: 3200,
        profit: 1600,
        margin: 50,
    },
    {
        name: "Spark Plugs",
        revenue: 2800,
        profit: 1120,
        margin: 40,
    },
    {
        name: "Alternators",
        revenue: 6500,
        profit: 2275,
        margin: 35,
    },
    {
        name: "Batteries",
        revenue: 5200,
        profit: 1560,
        margin: 30,
    },
    {
        name: "Air Filters",
        revenue: 1800,
        profit: 900,
        margin: 50,
    },
]

export function ProductProfitChart() {
    return (
        <ChartContainer
            config={{
                revenue: {
                    label: "Revenue",
                    color: "hsl(var(--primary))",
                },
                profit: {
                    label: "Profit",
                    color: "hsl(var(--primary-foreground))",
                },
                margin: {
                    label: "Margin %",
                    color: "hsl(var(--destructive))",
                },
            }}
            className="h-[350px]"
        >
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis
                        yAxisId="left"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value}`}
                    />
                    <YAxis
                        yAxisId="right"
                        orientation="right"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar yAxisId="left" dataKey="revenue" name="Revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
                    <Bar yAxisId="left" dataKey="profit" name="Profit" fill="var(--color-profit)" radius={[4, 4, 0, 0]} />
                    <Bar yAxisId="right" dataKey="margin" name="Margin %" fill="var(--color-margin)" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </ChartContainer>
    )
}

