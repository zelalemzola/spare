import { NextResponse } from "next/server"
import { SaleRepository, type Sale } from "@/lib/db"

export async function GET() {
  try {
    const sales = await SaleRepository.getAll()
    return NextResponse.json(sales)
  } catch (error) {
    console.error("Error fetching sales:", error)
    return NextResponse.json({ error: "Failed to fetch sales" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const sale = await SaleRepository.create(data as Sale)
    return NextResponse.json(sale, { status: 201 })
  } catch (error) {
    console.error("Error creating sale:", error)
    return NextResponse.json({ error: "Failed to create sale" }, { status: 500 })
  }
}

