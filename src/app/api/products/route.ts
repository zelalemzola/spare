import { NextResponse } from "next/server"
import { ProductRepository, type Product } from "@/lib/db"

export async function GET() {
  try {
    const products = await ProductRepository.getAll()
    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const product = await ProductRepository.create(data as Product)
    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}

