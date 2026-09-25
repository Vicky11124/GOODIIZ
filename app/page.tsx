import { readProducts } from './lib/db'
import { defaultProducts, Product } from './lib/products'
import AgroHomeClient from './components/AgroHomeClient'

export const dynamic = 'force-dynamic'

export default async function Home() {
  let allProducts: Product[] = defaultProducts
  try {
    const fetched = await readProducts()
    if (Array.isArray(fetched) && fetched.length > 0) {
      allProducts = fetched
    }
  } catch (err) {
    console.error('Database load error, using default agro products:', err)
  }

  return <AgroHomeClient initialProducts={allProducts} />
}

