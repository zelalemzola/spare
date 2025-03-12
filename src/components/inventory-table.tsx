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
import { ArrowUpDown, ChevronDown, MoreHorizontal, AlertTriangle, Eye, Edit, Plus } from "lucide-react"

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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

// Define the type for our data
type Product = {
    id: string
    name: string
    category: string
    sku: string
    costPrice: number
    sellingPrice: number
    quantity: number
    status: "in-stock" | "low-stock" | "out-of-stock"
    lastUpdated: string
}

// Sample data
const data: Product[] = [
    {
        id: "1",
        name: "Brake Pad (Front)",
        category: "Brake System",
        sku: "BP-FRONT-001",
        costPrice: 25.0,
        sellingPrice: 45.0,
        quantity: 15,
        status: "in-stock",
        lastUpdated: "2023-06-10",
    },
    {
        id: "2",
        name: "Brake Pad (Rear)",
        category: "Brake System",
        sku: "BP-REAR-001",
        costPrice: 22.0,
        sellingPrice: 40.0,
        quantity: 12,
        status: "in-stock",
        lastUpdated: "2023-06-12",
    },
    {
        id: "3",
        name: "Oil Filter",
        category: "Engine Parts",
        sku: "OF-001",
        costPrice: 5.0,
        sellingPrice: 12.0,
        quantity: 30,
        status: "in-stock",
        lastUpdated: "2023-06-15",
    },
    {
        id: "4",
        name: "Air Filter",
        category: "Engine Parts",
        sku: "AF-001",
        costPrice: 8.0,
        sellingPrice: 18.0,
        quantity: 5,
        status: "low-stock",
        lastUpdated: "2023-06-08",
    },
    {
        id: "5",
        name: "Spark Plug",
        category: "Engine Parts",
        sku: "SP-001",
        costPrice: 3.5,
        sellingPrice: 8.0,
        quantity: 0,
        status: "out-of-stock",
        lastUpdated: "2023-06-01",
    },
    {
        id: "6",
        name: "Alternator",
        category: "Electrical",
        sku: "ALT-001",
        costPrice: 85.0,
        sellingPrice: 150.0,
        quantity: 3,
        status: "low-stock",
        lastUpdated: "2023-06-05",
    },
]

interface InventoryTableProps {
    filterText?: string
    categoryFilter?: string
    statusFilter?: string
}

export function InventoryTable({ filterText = "", categoryFilter = "all", statusFilter = "all" }: InventoryTableProps) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null)
    const [isViewDialogOpen, setIsViewDialogOpen] = React.useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false)
    const [isAddStockDialogOpen, setIsAddStockDialogOpen] = React.useState(false)
    const [stockToAdd, setStockToAdd] = React.useState("")

    const router = useRouter()

    // Filter the data based on the provided filters
    const filteredData = React.useMemo(() => {
        return data.filter((product) => {
            // Text filter
            const textMatch =
                filterText === "" ||
                product.name.toLowerCase().includes(filterText.toLowerCase()) ||
                product.sku.toLowerCase().includes(filterText.toLowerCase())

            // Category filter
            const categoryMatch = categoryFilter === "all" || product.category.toLowerCase() === categoryFilter.toLowerCase()

            // Status filter
            const statusMatch = statusFilter === "all" || product.status === statusFilter

            return textMatch && categoryMatch && statusMatch
        })
    }, [filterText, categoryFilter, statusFilter])

    // Define the columns
    const columns: ColumnDef<Product>[] = [
        {
            accessorKey: "name",
            header: "Name",
            cell: ({ row }) => (
                <div>
                    <div className="font-medium">{row.getValue("name")}</div>
                    <div className="text-sm text-muted-foreground">{row.original.sku}</div>
                </div>
            ),
        },
        {
            accessorKey: "category",
            header: "Category",
            cell: ({ row }) => <div>{row.getValue("category")}</div>,
        },
        {
            accessorKey: "costPrice",
            header: ({ column }) => {
                return (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        Cost Price
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                const amount = Number.parseFloat(row.getValue("costPrice"))
                const formatted = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                }).format(amount)
                return <div className="text-right font-medium">{formatted}</div>
            },
        },
        {
            accessorKey: "sellingPrice",
            header: ({ column }) => {
                return (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        Selling Price
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                const amount = Number.parseFloat(row.getValue("sellingPrice"))
                const formatted = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                }).format(amount)
                return <div className="text-right font-medium">{formatted}</div>
            },
        },
        {
            accessorKey: "quantity",
            header: ({ column }) => {
                return (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        Quantity
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="text-center">{row.getValue("quantity")}</div>,
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.getValue("status") as string

                return (
                    <div className="flex justify-center">
                        {status === "in-stock" && (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                In Stock
                            </Badge>
                        )}
                        {status === "low-stock" && (
                            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                                <AlertTriangle className="mr-1 h-3 w-3" />
                                Low Stock
                            </Badge>
                        )}
                        {status === "out-of-stock" && (
                            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                Out of Stock
                            </Badge>
                        )}
                    </div>
                )
            },
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const product = row.original

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
                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(product.id)}>
                                Copy product ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => {
                                    setSelectedProduct(product)
                                    setIsViewDialogOpen(true)
                                }}
                            >
                                <Eye className="mr-2 h-4 w-4" />
                                View details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => {
                                    setSelectedProduct(product)
                                    setIsEditDialogOpen(true)
                                }}
                            >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit product
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => {
                                    setSelectedProduct(product)
                                    setStockToAdd("")
                                    setIsAddStockDialogOpen(true)
                                }}
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Add stock
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]

    const table = useReactTable({
        data: filteredData,
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

    const handleAddStock = () => {
        if (!selectedProduct) return

        const quantity = Number.parseInt(stockToAdd)
        if (isNaN(quantity) || quantity <= 0) {
            toast.error("Invalid Quantity", {
                description: "Please enter a valid quantity greater than zero",
            })
            return
        }

        // In a real app, you would update the database here
        toast.success("Stock Added", {
            description: `Added ${quantity} units to ${selectedProduct.name}`,
        })

        setIsAddStockDialogOpen(false)
    }

    const handleEditProduct = () => {
        if (!selectedProduct) return

        // In a real app, you would update the database here
        toast.success("Product Updated", {
            description: `${selectedProduct.name} has been updated`,
        })

        setIsEditDialogOpen(false)
    }

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
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
                    selected.
                </div>
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

            {/* View Product Dialog */}
            <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Product Details</DialogTitle>
                        <DialogDescription>Detailed information about the selected product.</DialogDescription>
                    </DialogHeader>
                    {selectedProduct && (
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">Name</Label>
                                <div className="col-span-3">{selectedProduct.name}</div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">SKU</Label>
                                <div className="col-span-3">{selectedProduct.sku}</div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">Category</Label>
                                <div className="col-span-3">{selectedProduct.category}</div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">Cost Price</Label>
                                <div className="col-span-3">
                                    {new Intl.NumberFormat("en-US", {
                                        style: "currency",
                                        currency: "USD",
                                    }).format(selectedProduct.costPrice)}
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">Selling Price</Label>
                                <div className="col-span-3">
                                    {new Intl.NumberFormat("en-US", {
                                        style: "currency",
                                        currency: "USD",
                                    }).format(selectedProduct.sellingPrice)}
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">Quantity</Label>
                                <div className="col-span-3">{selectedProduct.quantity}</div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">Status</Label>
                                <div className="col-span-3">
                                    {selectedProduct.status === "in-stock" && (
                                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                            In Stock
                                        </Badge>
                                    )}
                                    {selectedProduct.status === "low-stock" && (
                                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                                            <AlertTriangle className="mr-1 h-3 w-3" />
                                            Low Stock
                                        </Badge>
                                    )}
                                    {selectedProduct.status === "out-of-stock" && (
                                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                            Out of Stock
                                        </Badge>
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">Last Updated</Label>
                                <div className="col-span-3">{selectedProduct.lastUpdated}</div>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Product Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Edit Product</DialogTitle>
                        <DialogDescription>Update the product information.</DialogDescription>
                    </DialogHeader>
                    {selectedProduct && (
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-name" className="text-right">
                                    Name
                                </Label>
                                <Input id="edit-name" defaultValue={selectedProduct.name} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-sku" className="text-right">
                                    SKU
                                </Label>
                                <Input id="edit-sku" defaultValue={selectedProduct.sku} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-cost-price" className="text-right">
                                    Cost Price
                                </Label>
                                <Input
                                    id="edit-cost-price"
                                    type="number"
                                    step="0.01"
                                    defaultValue={selectedProduct.costPrice}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-selling-price" className="text-right">
                                    Selling Price
                                </Label>
                                <Input
                                    id="edit-selling-price"
                                    type="number"
                                    step="0.01"
                                    defaultValue={selectedProduct.sellingPrice}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-quantity" className="text-right">
                                    Quantity
                                </Label>
                                <Input
                                    id="edit-quantity"
                                    type="number"
                                    defaultValue={selectedProduct.quantity}
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleEditProduct}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Add Stock Dialog */}
            <Dialog open={isAddStockDialogOpen} onOpenChange={setIsAddStockDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Add Stock</DialogTitle>
                        <DialogDescription>Add additional stock to the selected product.</DialogDescription>
                    </DialogHeader>
                    {selectedProduct && (
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">Product</Label>
                                <div className="col-span-3">{selectedProduct.name}</div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">Current Stock</Label>
                                <div className="col-span-3">{selectedProduct.quantity}</div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="add-stock-quantity" className="text-right">
                                    Quantity to Add
                                </Label>
                                <Input
                                    id="add-stock-quantity"
                                    type="number"
                                    value={stockToAdd}
                                    onChange={(e) => setStockToAdd(e.target.value)}
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddStockDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleAddStock}>Add Stock</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

