"use client"

import {
    Line,
    LineChart,
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
        name: "Jan",
        sales: 2400,
        profit: 1100,
        margin: 45,
    },
    {
        name: "Feb",
        sales: 1398,
        profit: 600,
        margin: 43,
    },
    {
        name: "Mar",
        sales: 9800,
        profit: 2800,
        margin: 28,
    },
    {
        name: "Apr",
        sales: 3908,
        profit: 1300,
        margin: 33,
    },
    {
        name: "May",
        sales: 4800,
        profit: 1800,
        margin: 37,
    },
    {
        name: "Jun",
        sales: 3800,
        profit: 1600,
        margin: 42,
    },
    {
        name: "Jul",
        sales: 4300,
        profit: 2100,
        margin: 49,
    },
]

export function SalesProfitChart() {
    return (
        <ChartContainer
            config={{
                sales: {
                    label: "Sales",
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
                <LineChart data={data}>
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
                    <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="sales"
                        name="Sales"
                        stroke="var(--color-sales)"
                        activeDot={{ r: 8 }}
                    />
                    <Line yAxisId="left" type="monotone" dataKey="profit" name="Profit" stroke="var(--color-profit)" />
                    <Line yAxisId="right" type="monotone" dataKey="margin" name="Margin %" stroke="var(--color-margin)" />
                </LineChart>
            </ResponsiveContainer>
        </ChartContainer>
    )
}

