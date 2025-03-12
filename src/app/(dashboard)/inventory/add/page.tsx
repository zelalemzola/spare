"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, Trash2 } from "lucide-react"
import { toast } from "sonner"

export default function AddProductPage() {
    const [variants, setVariants] = useState<
        Array<{
            name: string
            sku: string
            costPrice: string
            sellingPrice: string
            quantity: string
        }>
    >([])

    const [variantAttributes, setVariantAttributes] = useState<
        Array<{
            name: string
            values: string[]
        }>
    >([])

    const addVariantAttribute = () => {
        setVariantAttributes([...variantAttributes, { name: "", values: [] }])
    }

    const updateAttributeName = (index: number, name: string) => {
        const newAttributes = [...variantAttributes]
        newAttributes[index].name = name
        setVariantAttributes(newAttributes)
    }

    const updateAttributeValues = (index: number, valuesString: string) => {
        const newAttributes = [...variantAttributes]
        newAttributes[index].values = valuesString.split(",").map((v) => v.trim())
        setVariantAttributes(newAttributes)
    }

    const removeAttribute = (index: number) => {
        const newAttributes = [...variantAttributes]
        newAttributes.splice(index, 1)
        setVariantAttributes(newAttributes)
    }

    const generateVariants = () => {
        if (variantAttributes.length === 0) return

        // Helper function to generate combinations
        const generateCombinations = (arrays: string[][], current: string[] = [], index = 0): string[][] => {
            if (index === arrays.length) {
                return [current]
            }

            let result: string[][] = []
            for (const value of arrays[index]) {
                result = result.concat(generateCombinations(arrays, [...current, value], index + 1))
            }
            return result
        }

        const attributeValues = variantAttributes.map((attr) => attr.values)
        const attributeNames = variantAttributes.map((attr) => attr.name)

        if (attributeValues.some((values) => values.length === 0)) {
            toast.error("Error", {
                description: "All attributes must have at least one value",
            })
            return
        }

        const combinations = generateCombinations(attributeValues)

        const newVariants = combinations.map((combination) => {
            const name = combination.join(" / ")
            const sku = `SKU-${Math.random().toString(36).substring(2, 8).toUpperCase()}`

            return {
                name,
                sku,
                costPrice: "",
                sellingPrice: "",
                quantity: "",
            }
        })

        setVariants(newVariants)
    }

    const updateVariant = (index: number, field: string, value: string) => {
        const newVariants = [...variants]
        newVariants[index] = { ...newVariants[index], [field]: value }
        setVariants(newVariants)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // Here you would normally send the data to your API
        toast.success("Product Added", {
            description: "The product has been added to inventory",
        })

        // For demo purposes, log the data
        console.log("Product data:", {
            // Basic product info would be collected from form fields
            variants,
        })
    }

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Add New Product</h2>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Basic Information</CardTitle>
                            <CardDescription>Enter the basic details of the product</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Product Name</Label>
                                <Input id="name" placeholder="Enter product name" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="engine">Engine Parts</SelectItem>
                                        <SelectItem value="brakes">Brake System</SelectItem>
                                        <SelectItem value="suspension">Suspension</SelectItem>
                                        <SelectItem value="electrical">Electrical</SelectItem>
                                        <SelectItem value="body">Body Parts</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea id="description" placeholder="Enter product description" rows={4} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="brand">Brand</Label>
                                <Input id="brand" placeholder="Enter brand name" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="model">Compatible Models</Label>
                                <Input id="model" placeholder="E.g., Toyota Corolla 2018-2022" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Variant Attributes</CardTitle>
                            <CardDescription>Define attributes for product variants (e.g., Size, Color)</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {variantAttributes.map((attr, index) => (
                                <div key={index} className="space-y-2 border p-4 rounded-md">
                                    <div className="flex justify-between">
                                        <Label>Attribute Name</Label>
                                        <Button type="button" variant="ghost" size="sm" onClick={() => removeAttribute(index)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <Input
                                        value={attr.name}
                                        onChange={(e) => updateAttributeName(index, e.target.value)}
                                        placeholder="E.g., Size, Color, Material"
                                    />
                                    <Label>Values (comma separated)</Label>
                                    <Input
                                        value={attr.values.join(", ")}
                                        onChange={(e) => updateAttributeValues(index, e.target.value)}
                                        placeholder="E.g., Small, Medium, Large"
                                    />
                                </div>
                            ))}

                            <Button type="button" variant="outline" onClick={addVariantAttribute} className="w-full">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Add Attribute
                            </Button>

                            {variantAttributes.length > 0 && (
                                <Button type="button" onClick={generateVariants} className="w-full">
                                    Generate Variants
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {variants.length > 0 && (
                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle>Product Variants</CardTitle>
                            <CardDescription>Set pricing and inventory for each variant</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Variant</TableHead>
                                        <TableHead>SKU</TableHead>
                                        <TableHead>Cost Price</TableHead>
                                        <TableHead>Selling Price</TableHead>
                                        <TableHead>Quantity</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {variants.map((variant, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{variant.name}</TableCell>
                                            <TableCell>{variant.sku}</TableCell>
                                            <TableCell>
                                                <Input
                                                    type="number"
                                                    value={variant.costPrice}
                                                    onChange={(e) => updateVariant(index, "costPrice", e.target.value)}
                                                    placeholder="0.00"
                                                    step="0.01"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Input
                                                    type="number"
                                                    value={variant.sellingPrice}
                                                    onChange={(e) => updateVariant(index, "sellingPrice", e.target.value)}
                                                    placeholder="0.00"
                                                    step="0.01"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Input
                                                    type="number"
                                                    value={variant.quantity}
                                                    onChange={(e) => updateVariant(index, "quantity", e.target.value)}
                                                    placeholder="0"
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                )}

                <div className="mt-6 flex justify-end">
                    <Button type="submit" size="lg">
                        Add Product to Inventory
                    </Button>
                </div>
            </form>
        </div>
    )
}

