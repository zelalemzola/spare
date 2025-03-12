import { MongoClient, ObjectId } from "mongodb"

// MongoDB connection string
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017"
const dbName = "car_parts_inventory"

// MongoDB client
let client: MongoClient
let clientPromise: Promise<MongoClient>

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MongoDB URI to .env.local")
}

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri)
  clientPromise = client.connect()
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export { clientPromise, ObjectId }

// Helper function to get database
export async function getDb() {
  const client = await clientPromise
  return client.db(dbName)
}

// Product types
export interface ProductVariant {
  _id?: ObjectId
  name: string
  sku: string
  costPrice: number
  sellingPrice: number
  quantity: number
  attributes: Record<string, string>
}

export interface Product {
  _id?: ObjectId
  name: string
  category: string
  description?: string
  brand?: string
  compatibleModels?: string[]
  variants: ProductVariant[]
  createdAt: Date
  updatedAt: Date
}

// Sale types
export interface SaleItem {
  productId: ObjectId
  variantId: ObjectId
  name: string
  sku: string
  quantity: number
  costPrice: number
  sellingPrice: number
  actualSellingPrice: number
}

export interface Sale {
  _id?: ObjectId
  customer?: string
  items: SaleItem[]
  total: number
  profit: number
  status: "completed" | "pending" | "refunded"
  createdAt: Date
  updatedAt: Date
}

// Product repository
export const ProductRepository = {
  async getAll() {
    const db = await getDb()
    return db.collection("products").find().toArray()
  },

  async getById(id: string) {
    const db = await getDb()
    return db.collection("products").findOne({ _id: new ObjectId(id) })
  },

  async create(product: Product) {
    const db = await getDb()
    const now = new Date()
    const newProduct = {
      ...product,
      createdAt: now,
      updatedAt: now,
    }
    const result = await db.collection("products").insertOne(newProduct)
    return { ...newProduct, _id: result.insertedId }
  },

  async update(id: string, product: Partial<Product>) {
    const db = await getDb()
    const now = new Date()
    const updateData = {
      ...product,
      updatedAt: now,
    }
    await db.collection("products").updateOne({ _id: new ObjectId(id) }, { $set: updateData })
    return this.getById(id)
  },

  async delete(id: string) {
    const db = await getDb()
    await db.collection("products").deleteOne({ _id: new ObjectId(id) })
    return true
  },

  async getLowStock(threshold = 5) {
    const db = await getDb()
    return db
      .collection("products")
      .find({
        "variants.quantity": { $lte: threshold, $gt: 0 },
      })
      .toArray()
  },

  async getOutOfStock() {
    const db = await getDb()
    return db
      .collection("products")
      .find({
        "variants.quantity": 0,
      })
      .toArray()
  },
}

// Sale repository
export const SaleRepository = {
  async getAll() {
    const db = await getDb()
    return db.collection("sales").find().sort({ createdAt: -1 }).toArray()
  },

  async getById(id: string) {
    const db = await getDb()
    return db.collection("sales").findOne({ _id: new ObjectId(id) })
  },

  async create(sale: Sale) {
    const db = await getDb()
    const now = new Date()
    const newSale = {
      ...sale,
      createdAt: now,
      updatedAt: now,
    }
    const result = await db.collection("sales").insertOne(newSale)

    // Update inventory quantities
    for (const item of sale.items) {
      await db.collection("products").updateOne(
        {
          _id: item.productId,
          "variants._id": item.variantId,
        },
        {
          $inc: { "variants.$.quantity": -item.quantity },
        },
      )
    }

    return { ...newSale, _id: result.insertedId }
  },

  async update(id: string, sale: Partial<Sale>) {
    const db = await getDb()
    const now = new Date()
    const updateData = {
      ...sale,
      updatedAt: now,
    }
    await db.collection("sales").updateOne({ _id: new ObjectId(id) }, { $set: updateData })
    return this.getById(id)
  },

  async getSalesByDateRange(startDate: Date, endDate: Date) {
    const db = await getDb()
    return db
      .collection("sales")
      .find({
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        },
      })
      .sort({ createdAt: -1 })
      .toArray()
  },

  async getAnalytics(startDate: Date, endDate: Date) {
    const db = await getDb()
    const sales = await this.getSalesByDateRange(startDate, endDate)

    const totalSales = sales.reduce((sum, sale) => sum + sale.total, 0)
    const totalProfit = sales.reduce((sum, sale) => sum + sale.profit, 0)
    const profitMargin = totalSales > 0 ? (totalProfit / totalSales) * 100 : 0

    const productPerformance:any = {}
    for (const sale of sales) {
      for (const item of sale.items) {
        if (!productPerformance[item.sku]) {
          productPerformance[item.sku] = {
            name: item.name,
            sku: item.sku,
            quantity: 0,
            revenue: 0,
            profit: 0,
          }
        }

        productPerformance[item.sku].quantity += item.quantity
        productPerformance[item.sku].revenue += item.quantity * item.actualSellingPrice
        productPerformance[item.sku].profit += item.quantity * (item.actualSellingPrice - item.costPrice)
      }
    }

    return {
      totalSales,
      totalProfit,
      profitMargin,
      salesCount: sales.length,
      productPerformance: Object.values(productPerformance),
    }
  },
}

