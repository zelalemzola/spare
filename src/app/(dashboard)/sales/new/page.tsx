"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "sonner"
import { PlusCircle, Trash2, Search } from "lucide-react"

interface ProductVariant {
    id: string
    name: string
    sku: string
    costPrice: number
    sellingPrice: number
    currentPrice: number
    quantity: number
}

interface SaleItem {
    variant: ProductVariant
    quantity: number
    actualSellingPrice: number
}

export default function NewSalePage() {
    const [saleItems, setSaleItems] = useState<SaleItem[]>([])
    const [searchTerm, setSearchTerm] = useState("")

    // Mock data for demonstration
    const mockProducts: ProductVariant[] = [
        {
            id: "1",
            name: "Brake Pad / Front / Toyota",
            sku: "BP-FRONT-TOY",
            costPrice: 25.0,
            sellingPrice: 45.0,
            currentPrice: 45.0,
            quantity: 15,
        },
        {
            id: "2",
            name: "Brake Pad / Rear / Toyota",
            sku: "BP-REAR-TOY",
            costPrice: 22.0,
            sellingPrice: 40.0,
            currentPrice: 40.0,
            quantity: 12,
        },
        {
            id: "3",
            name: "Oil Filter / Toyota",
            sku: "OF-TOY",
            costPrice: 5.0,
            sellingPrice: 12.0,
            currentPrice: 12.0,
            quantity: 30,
        },
    ]

    const [searchResults, setSearchResults] = useState<ProductVariant[]>([])

    const handleSearch = () => {
        if (!searchTerm) {
            setSearchResults([])
            return
        }

        const results = mockProducts.filter(
            (product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.sku.toLowerCase().includes(searchTerm.toLowerCase()),
        )

        setSearchResults(results)
    }

    const addItemToSale = (product: ProductVariant) => {
        // Check if already in sale
        const existingItemIndex = saleItems.findIndex((item) => item.variant.id === product.id)

        if (existingItemIndex >= 0) {
            // Update quantity if already in cart
            const updatedItems = [...saleItems]
            updatedItems[existingItemIndex].quantity += 1
            setSaleItems(updatedItems)
        } else {
            // Add new item
            setSaleItems([
                ...saleItems,
                {
                    variant: product,
                    quantity: 1,
                    actualSellingPrice: product.currentPrice,
                },
            ])
        }

        // Clear search
        setSearchTerm("")
        setSearchResults([])

        toast.success("Item Added", {
            description: `${product.name} added to sale`,
        })
    }

    const updateItemQuantity = (index: number, quantity: number) => {
        if (quantity <= 0) {
            removeItem(index)
            return
        }

        const updatedItems = [...saleItems]
        updatedItems[index].quantity = quantity
        setSaleItems(updatedItems)
    }

    const updateItemPrice = (index: number, price: number) => {
        const updatedItems = [...saleItems]
        updatedItems[index].actualSellingPrice = price
        setSaleItems(updatedItems)
    }

    const removeItem = (index: number) => {
        const updatedItems = [...saleItems]
        updatedItems.splice(index, 1)
        setSaleItems(updatedItems)
    }

    const calculateSubtotal = () => {
        return saleItems.reduce((total, item) => total + item.actualSellingPrice * item.quantity, 0)
    }

    const calculateProfit = () => {
        return saleItems.reduce(
            (total, item) => total + (item.actualSellingPrice - item.variant.costPrice) * item.quantity,
            0,
        )
    }

    const handleCompleteSale = () => {
        // Here you would normally send the sale data to your API

        const saleData = {
            items: saleItems,
            subtotal: calculateSubtotal(),
            profit: calculateProfit(),
            date: new Date().toISOString(),
        }

        console.log("Sale completed:", saleData)

        toast.success("Sale Completed", {
            description: `Sale of $${calculateSubtotal().toFixed(2)} has been recorded`,
        })

        // Clear the sale items
        setSaleItems([])
    }

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">New Sale</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Add Products</CardTitle>
                        <CardDescription>Search for products to add to this sale</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex space-x-2">
                            <div className="relative flex-1">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search by name or SKU..."
                                    className="pl-8"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleSearch()
                                        }
                                    }}
                                />
                            </div>
                            <Button onClick={handleSearch}>Search</Button>
                        </div>

                        {searchResults.length > 0 && (
                            <Card>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Product</TableHead>
                                            <TableHead>SKU</TableHead>
                                            <TableHead>Price</TableHead>
                                            <TableHead>Stock</TableHead>
                                            <TableHead></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {searchResults.map((product) => (
                                            <TableRow key={product.id}>
                                                <TableCell>{product.name}</TableCell>
                                                <TableCell>{product.sku}</TableCell>
                                                <TableCell>${product.currentPrice.toFixed(2)}</TableCell>
                                                <TableCell>{product.quantity}</TableCell>
                                                <TableCell>
                                                    <Button size="sm" onClick={() => addItemToSale(product)} disabled={product.quantity <= 0}>
                                                        <PlusCircle className="h-4 w-4 mr-1" />
                                                        Add
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Card>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Sale Summary</CardTitle>
                        <CardDescription>Review and adjust the current sale</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {saleItems.length === 0 ? (
                            <div className="text-center py-6 text-muted-foreground">No items added to this sale yet</div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Product</TableHead>
                                        <TableHead>Quantity</TableHead>
                                        <TableHead>Unit Price</TableHead>
                                        <TableHead>Total</TableHead>
                                        <TableHead></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {saleItems.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{item.variant.name}</TableCell>
                                            <TableCell>
                                                <Input
                                                    type="number"
                                                    min="1"
                                                    value={item.quantity}
                                                    onChange={(e) => updateItemQuantity(index, Number.parseInt(e.target.value))}
                                                    className="w-16"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Input
                                                    type="number"
                                                    min="0"
                                                    step="0.01"
                                                    value={item.actualSellingPrice}
                                                    onChange={(e) => updateItemPrice(index, Number.parseFloat(e.target.value))}
                                                    className="w-24"
                                                />
                                            </TableCell>
                                            <TableCell>${(item.quantity * item.actualSellingPrice).toFixed(2)}</TableCell>
                                            <TableCell>
                                                <Button variant="ghost" size="sm" onClick={() => removeItem(index)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}

                        {saleItems.length > 0 && (
                            <div className="space-y-2 pt-4">
                                <div className="flex justify-between text-sm">
                                    <span>Subtotal:</span>
                                    <span className="font-medium">${calculateSubtotal().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Estimated Profit:</span>
                                    <span className="font-medium text-green-600">${calculateProfit().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Profit Margin:</span>
                                    <span className="font-medium">
                                        {calculateSubtotal() > 0
                                            ? `${((calculateProfit() / calculateSubtotal()) * 100).toFixed(2)}%`
                                            : "0.00%"}
                                    </span>
                                </div>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline">Cancel</Button>
                        <Button onClick={handleCompleteSale} disabled={saleItems.length === 0}>
                            Complete Sale
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

