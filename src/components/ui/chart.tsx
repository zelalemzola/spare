"use client"

import * as React from "react"
import {
    Bar as RechartsBar,
    BarChart as RechartsBarChart,
    CartesianGrid as RechartsCartesianGrid,
    Legend as RechartsLegend,
    Line as RechartsLine,
    LineChart as RechartsLineChart,
    ResponsiveContainer as RechartsResponsiveContainer,
    Tooltip as RechartsTooltip,
    XAxis as RechartsXAxis,
    YAxis as RechartsYAxis,
    Pie as RechartsPie,
    PieChart as RechartsPieChart,
    Cell as RechartsCell,
    Sector as RechartsSector,
    Area as RechartsArea,
    AreaChart as RechartsAreaChart,
} from "recharts"

import { cn } from "@/lib/utils"

// Re-export Recharts components
export const Bar = RechartsBar
export const BarChart = RechartsBarChart
export const CartesianGrid = RechartsCartesianGrid
export const Legend = RechartsLegend
export const Line = RechartsLine
export const LineChart = RechartsLineChart
export const ResponsiveContainer = RechartsResponsiveContainer
export const Tooltip = RechartsTooltip
export const XAxis = RechartsXAxis
export const YAxis = RechartsYAxis
export const Pie = RechartsPie
export const PieChart = RechartsPieChart
export const Cell = RechartsCell
export const Sector = RechartsSector
export const Area = RechartsArea
export const AreaChart = RechartsAreaChart

// Custom chart container with configuration
interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    config?: Record<string, { label: string; color: string }>
}

export function ChartContainer({ config, children, className, ...props }: ChartContainerProps) {
    // Create CSS variables for chart colors
    const style = React.useMemo(() => {
        if (!config) return {}

        return Object.entries(config).reduce((acc, [key, value]) => {
            return {
                ...acc,
                [`--color-${key}`]: value.color,
            }
        }, {})
    }, [config])

    return (
        <div className={cn("chart-container", className)} style={style} {...props}>
            {children}
        </div>
    )
}

// Custom tooltip component
export function ChartTooltip({ active, payload, label }: any) {
    if (!active || !payload?.length) return null

    return (
        <div className="rounded-lg border bg-background p-2 shadow-sm">
            <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col">
                    <span className="text-[0.70rem] uppercase text-muted-foreground">{label}</span>
                </div>
                {payload.map((item: any) => (
                    <div key={item.name} className="flex flex-col">
                        <span className="text-[0.70rem] font-bold" style={{ color: item.color }}>
                            {item.name}
                        </span>
                        <span className="text-xs font-bold">{item.value}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

// Custom tooltip content component
export function ChartTooltipContent({ active, payload, label }: any) {
    if (!active || !payload?.length) return null

    return (
        <div className="rounded-lg border bg-background p-2 shadow-sm">
            <div className="grid gap-1">
                <div className="flex flex-col">
                    <span className="text-[0.70rem] uppercase text-muted-foreground">{label}</span>
                </div>
                {payload.map((item: any) => (
                    <div key={item.name} className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                            <span className="text-[0.70rem]">{item.name}</span>
                        </div>
                        <span className="text-[0.70rem] font-medium">
                            {typeof item.value === "number"
                                ? item.value.toLocaleString(undefined, {
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 2,
                                })
                                : item.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

