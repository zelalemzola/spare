import { NextResponse } from "next/server"
import { ProductRepository, type Product } from "@/lib/db"

export async function GET(request: Request, context: { params: { id: string } }) {
  try {
    const product = await ProductRepository.getById(context.params.id)

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}

export async function PUT(request: Request, context: { params: { id: string } }) {
  try {
    const data = await request.json()
    const product = await ProductRepository.update(context.params.id, data as Partial<Product>)

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error("Error updating product:", error)
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(request: Request, context: { params: { id: string } }) {
  try {
    const success = await ProductRepository.delete(context.params.id)

    if (!success) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting product:", error)
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}
