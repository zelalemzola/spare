"use client"

import * as React from "react"
import {
    type ColumnDef,
    type ColumnFiltersState,
    type SortingState,
    type VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Define the type for our data
type Sale = {
    id: string
    date: string
    customer: string
    items: number
    total: number
    profit: number
    margin: number
    status: "completed" | "pending" | "refunded"
}

// Sample data
const data: Sale[] = [
    {
        id: "SALE-001",
        date: "2023-06-15",
        customer: "Jackson Davis",
        items: 5,
        total: 242.0,
        profit: 98.0,
        margin: 40.5,
        status: "completed",
    },
    {
        id: "SALE-002",
        date: "2023-06-14",
        customer: "Sarah Miller",
        items: 1,
        total: 189.0,
        profit: 75.0,
        margin: 39.7,
        status: "completed",
    },
    {
        id: "SALE-003",
        date: "2023-06-14",
        customer: "Robert Kim",
        items: 2,
        total: 325.0,
        profit: 145.0,
        margin: 44.6,
        status: "completed",
    },
    {
        id: "SALE-004",
        date: "2023-06-13",
        customer: "Lisa Johnson",
        items: 3,
        total: 156.0,
        profit: 62.0,
        margin: 39.7,
        status: "completed",
    },
    {
        id: "SALE-005",
        date: "2023-06-12",
        customer: "Michael Thompson",
        items: 6,
        total: 78.0,
        profit: 30.0,
        margin: 38.5,
        status: "completed",
    },
    {
        id: "SALE-006",
        date: "2023-06-12",
        customer: "Emma Wilson",
        items: 2,
        total: 135.0,
        profit: 55.0,
        margin: 40.7,
        status: "refunded",
    },
    {
        id: "SALE-007",
        date: "2023-06-11",
        customer: "David Chen",
        items: 4,
        total: 210.0,
        profit: 85.0,
        margin: 40.5,
        status: "completed",
    },
]

// Define the columns
export const columns: ColumnDef<Sale>[] = [
    {
        accessorKey: "id",
        header: "Sale ID",
        cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
    },
    {
        accessorKey: "date",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("date")}</div>,
    },
    {
        accessorKey: "customer",
        header: "Customer",
        cell: ({ row }) => <div>{row.getValue("customer")}</div>,
    },
    {
        accessorKey: "items",
        header: "Items",
        cell: ({ row }) => <div className="text-center">{row.getValue("items")}</div>,
    },
    {
        accessorKey: "total",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Total
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const amount = Number.parseFloat(row.getValue("total"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)
            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "profit",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Profit
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const amount = Number.parseFloat(row.getValue("profit"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)
            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "margin",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Margin
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const margin = Number.parseFloat(row.getValue("margin"))
            return <div className="text-right font-medium">{margin.toFixed(1)}%</div>
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string

            return (
                <div className="flex justify-center">
                    {status === "completed" && (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Completed
                        </Badge>
                    )}
                    {status === "pending" && (
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                            Pending
                        </Badge>
                    )}
                    {status === "refunded" && (
                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                            Refunded
                        </Badge>
                    )}
                </div>
            )
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const sale = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(sale.id)}>Copy sale ID</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Print receipt</DropdownMenuItem>
                        {sale.status !== "refunded" && <DropdownMenuItem>Process refund</DropdownMenuItem>}
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

export function SalesTable() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="w-full">
            <div className="flex items-center py-4 justify-end">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}

