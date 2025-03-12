"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { InventoryTable } from "@/components/inventory-table"
import Link from "next/link"

export default function InventoryPage() {
    const searchParams = useSearchParams()
    const router = useRouter()

    const [filterText, setFilterText] = useState("")
    const [categoryFilter, setCategoryFilter] = useState(searchParams.get("category") || "all")
    const [statusFilter, setStatusFilter] = useState(searchParams.get("status") || "all")

    // Apply filters when they change
    useEffect(() => {
        const params = new URLSearchParams()

        if (categoryFilter && categoryFilter !== "all") {
            params.set("category", categoryFilter)
        }

        if (statusFilter && statusFilter !== "all") {
            params.set("status", statusFilter)
        }

        const queryString = params.toString()
        router.push(`/inventory${queryString ? `?${queryString}` : ""}`)
    }, [categoryFilter, statusFilter, router])

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
                <h2 className="text-3xl font-bold tracking-tight">Inventory</h2>
                <div>
                    <Button>
                        <Link href="/inventory/add">Add New Product</Link>
                    </Button>
                </div>
            </div>

            <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-x-2 md:space-y-0">
                <Input
                    placeholder="Filter products..."
                    className="md:max-w-sm"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                />
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="md:w-[180px]">
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="engine">Engine Parts</SelectItem>
                        <SelectItem value="brakes">Brake System</SelectItem>
                        <SelectItem value="suspension">Suspension</SelectItem>
                        <SelectItem value="electrical">Electrical</SelectItem>
                        <SelectItem value="body">Body Parts</SelectItem>
                    </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="md:w-[180px]">
                        <SelectValue placeholder="Stock Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="in-stock">In Stock</SelectItem>
                        <SelectItem value="low-stock">Low Stock</SelectItem>
                        <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <InventoryTable filterText={filterText} categoryFilter={categoryFilter} statusFilter={statusFilter} />
        </div>
    )
}

