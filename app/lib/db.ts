import fs from 'fs/promises'
import path from 'path'
import { Product, defaultProducts } from './products'

const dataFilePath = path.join(process.cwd(), 'data', 'products.json')

export async function readProducts(): Promise<Product[]> {
  try {
    const fileContent = await fs.readFile(dataFilePath, 'utf-8')
    const products: Product[] = JSON.parse(fileContent)
    return products
  } catch (error) {
    // If file doesn't exist or has error, initialize with default products
    try {
      await writeProducts(defaultProducts)
    } catch {
      // Ignore write errors on edge
    }
    return defaultProducts
  }
}

export async function writeProducts(products: Product[]): Promise<void> {
  const dir = path.dirname(dataFilePath)
  await fs.mkdir(dir, { recursive: true })
  await fs.writeFile(dataFilePath, JSON.stringify(products, null, 2), 'utf-8')
}
