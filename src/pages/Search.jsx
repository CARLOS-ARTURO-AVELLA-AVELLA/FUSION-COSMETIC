import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import ProductCard from '../components/products/ProductCard'
import { useProductStore } from '../store/productStore'
import { Search as SearchIcon, X } from 'lucide-react'

export default function Search() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { products, filteredProducts, searchProducts } = useProductStore()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [sugerencias, setSugerencias] = useState([])
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false)

  
  useEffect(() => {
    if (searchQuery.trim()) {
      searchProducts(searchQuery)
    } else {
      searchProducts('')
    }
  }, [searchQuery, searchProducts])


  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase()
      const sugerenciasUnicas = new Set()

      products.forEach((product) => {
        if (product.nombre.toLowerCase().includes(query)) {
          sugerenciasUnicas.add(product.nombre)
        }
        if (product.marca.toLowerCase().includes(query)) {
          sugerenciasUnicas.add(product.marca)
        }
        if (product.tipo.toLowerCase().includes(query)) {
          sugerenciasUnicas.add(product.tipo)
        }
      })

      setSugerencias(Array.from(sugerenciasUnicas).slice(0, 8))
      setMostrarSugerencias(true)
    } else {
      setSugerencias([])
      setMostrarSugerencias(false)
    }
  }, [searchQuery, products])

  const handleBuscar = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/buscar?q=${encodeURIComponent(searchQuery)}`)
      setMostrarSugerencias(false)
    }
  }

  const handleSeleccionarSugerencia = (sugerencia) => {
    setSearchQuery(sugerencia)
    searchProducts(sugerencia)
    setMostrarSugerencias(false)
  }

  const limpiarBusqueda = () => {
    setSearchQuery('')
    setSugerencias([])
    navigate('/buscar')
  }

  return (
    <div className="min-h-screen bg-white">
     
    <section className="bg-gradient-to-r from-turquoise to-teal-500 py-12">
    <div className="max-w-7xl mx-auto px-4">
    <h1 className="text-4xl font-bold font-display text-white mb-8">
      Buscar Productos
    </h1>

          
    <form onSubmit={handleBuscar} className="relative max-w-2xl">
    <div className="relative">
    <SearchIcon
      size={24}
       className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
  />
    <input
      type="text"
      placeholder="Busca perfumes, marcas, tipos..."
      value={searchQuery}
      nChange={(e) => setSearchQuery(e.target.value)}
       className="w-full pl-12 pr-12 py-4 bg-white border-2 border-white rounded-lg focus:outline-none focus:border-gold transition text-lg"
      autoFocus
  />
      {searchQuery && (
    <button
      type="button"
      onClick={limpiarBusqueda}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
  >
    <X size={20} />
    </button>
  )}

            
      {mostrarSugerencias && sugerencias.length > 0 && (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
      {sugerencias.map((sugerencia, idx) => (
    <button
      key={idx}
      type="button"
      onClick={() => handleSeleccionarSugerencia(sugerencia)}
      className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition flex items-center gap-3"
  >
    <SearchIcon size={16} className="text-gray-400" />
    <span className="text-gray-700">{sugerencia}</span>
    </button>
))}
  </div>
  )}
  </div>
    </form>
  </div>
  </section>

   
    <section className="py-12">
    <div className="max-w-7xl mx-auto px-4">
      {searchQuery.trim() ? (
  <>
    <div className="mb-8">
    <h2 className="text-2xl font-bold text-dark mb-2">
      Resultados para "{searchQuery}"
    </h2>
    <p className="text-gray-600">
      {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
    </p>
    </div>

      {filteredProducts.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredProducts.map((product) => (
      <ProductCard key={product.id} producto={product} />
))}
  </div>
  ) : (
    <div className="text-center py-16">
    <SearchIcon size={64} className="mx-auto text-gray-300 mb-4" />
    <h3 className="text-2xl font-bold text-gray-600 mb-2">
      No se encontraron resultados
    </h3>
    <p className="text-gray-500 mb-6">
      Intenta con diferentes palabras clave o explora nuestro catálogo completo
    </p>
    <div className="flex gap-4 justify-center">
    <button
      onClick={() => navigate('/productos')}
      className="px-6 py-3 bg-turquoise text-white font-bold rounded hover:bg-teal-600 transition"
  >
      Ver Catálogo
    </button>
    <button
      onClick={limpiarBusqueda}
      className="px-6 py-3 bg-gray-200 text-gray-700 font-bold rounded hover:bg-gray-300 transition"
  >
      Nueva Búsqueda
    </button>
  </div>
  </div>
  )}
  </>
  ) : (
    <div className="text-center py-16">
    <SearchIcon size={64} className="mx-auto text-gray-300 mb-4" />
    <h2 className="text-3xl font-bold text-gray-600 mb-4">
      ¿Qué estás buscando?
    </h2>
    <p className="text-gray-500 mb-8 max-w-md mx-auto">
      Usa la barra de búsqueda para encontrar perfumes, marcas, tipos de fragancias y más.
    </p>
    <button
      onClick={() => navigate('/productos')}
      className="px-6 py-3 bg-turquoise text-white font-bold rounded hover:bg-teal-600 transition"
  >
      Explorar Catálogo
    </button>
  </div>
  )}
  </div>
  </section>

     
      {!searchQuery.trim() && (
    <section className="py-16 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4">
    <h2 className="text-3xl font-bold font-display text-dark mb-8">
              Búsquedas Populares
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {[
      'Sauvage',
      'Versace',
      'Carolina Herrera',
      'Floral',
      'Amaderado',
      'Frutal',
      'Christian Dior',
      'Descuentos'
      ].map((popular, idx) => (
    <button
      key={idx}
      onClick={() => {
      setSearchQuery(popular)
      searchProducts(popular)
  }}
      className="px-6 py-4 bg-white border-2 border-gray-200 rounded-lg hover:border-turquoise hover:text-turquoise transition font-semibold text-gray-700"
  >
      {popular}
    </button>
))}
  </div>
  </div>
  </section>
  )}
  </div>
  )
}