import { useNavigate } from 'react-router-dom'
import ProductCard from '../components/products/ProductCard'
import Filters from '../components/products/Filters'
import { useProductStore } from '../store/productStore'

export default function Products() {
  const navigate = useNavigate()
  const products = useProductStore((state) => state.products)
  
  return (
    <div className="min-h-screen bg-white">
    <div className="bg-gradient-to-r from-dark to-gray-800 text-white py-16">
    <div className="max-w-7xl mx-auto px-4">
    <h1 className="text-5xl font-bold font-display mb-4">Nuestros Perfumes</h1>
    <p className="text-xl text-gray-300">Descubre nuestra colección completa</p>
</div>
</div>
    <div className="max-w-7xl mx-auto px-4 py-12">
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
    <div className="lg:col-span-1">
    <Filters />
    </div>
    <div className="lg:col-span-3">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {products.map((product) => (
    <ProductCard key={product.id} producto={product} />
  ))}
  </div>
  </div>
  </div>
  </div>
  </div>
  )
}