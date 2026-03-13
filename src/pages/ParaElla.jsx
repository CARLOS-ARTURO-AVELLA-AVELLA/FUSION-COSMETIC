import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductCard from '../components/products/ProductCard'
import { useProductStore } from '../store/productStore'

export default function ParaElla() {
  const navigate = useNavigate()
  const { products, filteredProducts, filterProducts, sortProducts, searchProducts } = useProductStore()
  const [sortType, setSortType] = useState('popular')
  const [searchQuery, setSearchQuery] = useState('')
  
  // Calcular el precio máximo dinámicamente para productos de mujer
  const womenProducts = products.filter(p => p.genero === 'mujer')
  const maxPrice = womenProducts.length > 0 ? Math.max(...womenProducts.map(p => p.precio)) : 1000000
  
  const [priceRange, setPriceRange] = useState({ min: 0, max: maxPrice })

  // Filtrar productos para mujeres al cargar
  useEffect(() => {
    filterProducts({ 
      genero: 'mujer',
      priceMin: priceRange.min,
      priceMax: priceRange.max
    })
  }, [priceRange, filterProducts])

  // Aplicar búsqueda
  const handleSearch = (e) => {
    const query = e.target.value
    setSearchQuery(query)
    if (query.trim()) {
      searchProducts(query)
      // Luego filtrar por género
      filterProducts({ genero: 'mujer' })
    } else {
      filterProducts({ 
        genero: 'mujer',
        priceMin: priceRange.min,
        priceMax: priceRange.max
      })
    }
  }

  // Aplicar ordenamiento
  const handleSort = (newSortType) => {
    setSortType(newSortType)
    sortProducts(newSortType)
  }

  // Filtrar por precio
  const handlePriceChange = (e, type) => {
    const newRange = { ...priceRange, [type]: parseInt(e.target.value) }
    setPriceRange(newRange)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-turquoise to-gold py-16 border-b-2 border-turquoise/20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold font-display text-white mb-3">
            Para <span className="font-light">Ella</span>
          </h1>
          <p className="text-white/90 text-lg max-w-2xl">
            Explora nuestra exclusiva colección de fragancias para mujeres. Desde aromas frescos y florales 
            hasta sofisticadas fragancias orientales, encuentra el perfume que refleje tu personalidad.
          </p>
        </div>
      </section>

      {/* Filtros y Búsqueda */}
      <section className="sticky top-20 bg-white shadow-md z-20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            {/* Búsqueda */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Buscar Producto
              </label>
              <input
                type="text"
                placeholder="Busca por nombre, marca..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-turquoise transition"
              />
            </div>

            {/* Ordenamiento */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Ordenar Por
              </label>
              <select
                value={sortType}
                onChange={(e) => handleSort(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-turquoise transition bg-white font-semibold"
              >
                <option value="popular">Más Popular</option>
                <option value="precio-asc">Precio: Menor a Mayor</option>
                <option value="precio-desc">Precio: Mayor a Menor</option>
                <option value="rating">Mejor Calificación</option>
                <option value="newest">Más Nuevo</option>
              </select>
            </div>
          </div>

          {/* Rango de Precio */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Precio Mínimo: ${priceRange.min.toLocaleString()}
              </label>
              <input
                type="range"
                min="0"
                max={maxPrice}
                value={priceRange.min}
                onChange={(e) => handlePriceChange(e, 'min')}
                className="w-full accent-turquoise"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Precio Máximo: ${priceRange.max.toLocaleString()}
              </label>
              <input
                type="range"
                min="0"
                max={maxPrice}
                value={priceRange.max}
                onChange={(e) => handlePriceChange(e, 'max')}
                className="w-full accent-turquoise"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Productos */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Contador de Productos */}
          <p className="text-gray-600 mb-8 font-semibold">
            {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
          </p>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} producto={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg mb-4">No se encontraron productos que coincidan con tu búsqueda</p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  filterProducts({ genero: 'mujer' })
                }}
                className="px-6 py-3 bg-turquoise text-white font-bold rounded hover:bg-gold hover:text-dark transition"
              >
                Ver Todos los Productos para Ella
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Sección de Nuevos Lanzamientos */}
      <section className="py-16 bg-gradient-to-r from-turquoise to-gold">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold font-display text-white mb-6">
            Próximos Lanzamientos
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            ¿Eres perfumista o dueña de una perfumería? Contáctanos para que tus nuevos lanzamientos 
            aparezcan aquí y lleguen a miles de clientes.
          </p>
          <button
            onClick={() => navigate('/contacto')}
            className="px-8 py-4 bg-white text-turquoise font-bold rounded-full hover:bg-gray-100 transition duration-300 text-lg shadow-lg"
          >
            Enviar Nuevo Lanzamiento
          </button>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-b from-turquoise/10 to-gold/10 rounded-xl p-8 text-center border-t-4 border-turquoise">
              <h3 className="text-2xl font-bold text-dark mb-3">Envío Rápido</h3>
              <p className="text-gray-600">
                Recibe tus fragancias favoritas en tiempo récord a cualquier parte del país.
              </p>
            </div>
            <div className="bg-gradient-to-b from-turquoise/10 to-gold/10 rounded-xl p-8 text-center border-t-4 border-gold">
              <h3 className="text-2xl font-bold text-dark mb-3">100% Auténticos</h3>
              <p className="text-gray-600">
                Todos nuestros productos son originales directos de distribuidores autorizados.
              </p>
            </div>
            <div className="bg-gradient-to-b from-turquoise/10 to-gold/10 rounded-xl p-8 text-center border-t-4 border-turquoise">
              <h3 className="text-2xl font-bold text-dark mb-3">Soporte 24/7</h3>
              <p className="text-gray-600">
                Estamos aquí para ayudarte a encontrar tu fragancia perfecta en cualquier momento.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}