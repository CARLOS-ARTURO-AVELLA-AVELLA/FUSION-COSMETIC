import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Filters from '../components/products/Filters'
import ProductCard from '../components/products/ProductCard'
import { useProductStore } from '../store/productStore'
import { useCartStore } from '../store/cartStore'
import { SORT_OPTIONS } from '../utils/constants'

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [sortType, setSortType] = useState('newest')
  const filteredProducts = useProductStore((state) => state.filteredProducts)
  const filterProducts = useProductStore((state) => state.filterProducts)
  const sortProducts = useProductStore((state) => state.sortProducts)
  const addItem = useCartStore((state) => state.addItem)

  // Aplicar filtros iniciales desde URL
  useEffect(() => {
    const filters = {
      search: searchParams.get('search'),
      genero: searchParams.get('genero'),
      marca: searchParams.get('marca'),
      tipo: searchParams.get('tipo'),
      new: searchParams.get('new') === 'true',
      discount: searchParams.get('discount') === 'true',
    }
    filterProducts(filters)
  }, [searchParams, filterProducts])

  // Aplicar ordenamiento
  useEffect(() => {
    sortProducts(sortType)
  }, [sortType, sortProducts])

  const handleFilterChange = (filters) => {
    const params = new URLSearchParams()
    if (filters.search) params.append('search', filters.search)
    if (filters.genero?.length) params.append('genero', filters.genero[0])
    if (filters.marca?.length) params.append('marca', filters.marca[0])
    if (filters.tipo?.length) params.append('tipo', filters.tipo[0])
    setSearchParams(params)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero pequeño */}
      <div className="bg-gradient-to-r from-dark to-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold font-display mb-4">
            Nuestros Perfumes
          </h1>
          <p className="text-xl text-gray-300">
            Descubre la colección completa de fragancias premium
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filtros */}
          <div className="lg:col-span-1">
            <Filters onFilterChange={handleFilterChange} />
          </div>

          {/* Productos */}
          <div className="lg:col-span-3">
            {/* Top Bar - Sort */}
            <div className="flex items-center justify-between mb-8">
              <p className="text-sm text-gray-600">
                Mostrando <span className="font-bold">{filteredProducts.length}</span> productos
              </p>
              <select
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Grid de productos */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredProducts.map((producto) => (
                  <ProductCard
                    key={producto.id}
                    producto={producto}
                    onAddToCart={addItem}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <h3 className="text-2xl font-bold text-dark mb-4">
                  No hay productos disponibles
                </h3>
                <p className="text-gray-600 mb-8">
                  Intenta cambiar los filtros o realiza una nueva búsqueda
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-gold text-dark font-bold rounded hover:bg-yellow-500 transition"
                >
                  Limpiar Filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}