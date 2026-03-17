import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductCard from '../components/products/ProductCard'
import { useProductStore } from '../store/productStore'
import { Filter, X } from 'lucide-react'

export default function Catalogo() {
  const navigate = useNavigate()
  const { products, filteredProducts, filterProducts, sortProducts, searchProducts } = useProductStore()
  const [sortType, setSortType] = useState('popular')
  const [searchQuery, setSearchQuery] = useState('')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const maxPrice = products.length > 0 ? Math.max(...products.map(p => p.precio)) : 1000000

  const [priceRange, setPriceRange] = useState({ min: 0, max: maxPrice })
  const [selectedGenero, setSelectedGenero] = useState('')
  const [selectedMarca, setSelectedMarca] = useState('')
  const [selectedTipo, setSelectedTipo] = useState('')

  // Obtener marcas y tipos únicos
  const marcas = [...new Set(products.map(p => p.marca))].sort()
  const tipos = [...new Set(products.map(p => p.tipo))].sort()
  const generos = [...new Set(products.map(p => p.genero?.toLowerCase()))].filter(Boolean).sort()
 
  useEffect(() => {
    filterProducts({
      genero: selectedGenero || undefined,
      marca: selectedMarca || undefined,
      tipo: selectedTipo || undefined,
      priceMin: priceRange.min,
      priceMax: priceRange.max
    })
  }, [selectedGenero, selectedMarca, selectedTipo, priceRange, filterProducts])

  
  const handleSearch = (e) => {
    const query = e.target.value
    setSearchQuery(query)
    if (query.trim()) {
      searchProducts(query)
    } else {
      filterProducts({
        genero: selectedGenero || undefined,
        marca: selectedMarca || undefined,
        tipo: selectedTipo || undefined,
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

  
  const handlePriceChange = (e, type) => {
    const newRange = { ...priceRange, [type]: parseInt(e.target.value) }
    setPriceRange(newRange)
  }

  const limpiarFiltros = () => {
    setSelectedGenero('')
    setSelectedMarca('')
    setSelectedTipo('')
    setPriceRange({ min: 0, max: maxPrice })
    setSearchQuery('')
    filterProducts({})
  }

  const filtrosActivos = selectedGenero || selectedMarca || selectedTipo || searchQuery

  return (
  <div className="min-h-screen bg-white">
      
  <section className="bg-gradient-to-r from-turquoise to-gold py-16">
  <div className="max-w-7xl mx-auto px-4">
  <h1 className="text-5xl font-bold font-display text-white mb-3">
    Catálogo Completo
  </h1>
  <p className="text-white/90 text-lg max-w-2xl">
    Explora nuestra colección completa de fragancias premium. Con filtros avanzados para encontrar
    exactamente lo que buscas.
  </p>
  </div>
  </section>

  <section className="bg-gray-50 py-8 sticky top-20 z-30 shadow-sm border-b-2 border-turquoise/20">
   <div className="max-w-7xl mx-auto px-4">
  <div className="flex gap-4 items-center">
  <input
    type="text"
    placeholder="Busca por nombre, marca, tipo..."
    value={searchQuery}
    onChange={handleSearch}
     className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-turquoise transition"
   />
    <button
    onClick={() => setFiltersOpen(!filtersOpen)}
     className="flex items-center gap-2 px-6 py-3 bg-turquoise text-white font-semibold rounded-lg hover:bg-teal-600 transition lg:hidden"
    >
    <Filter size={20} />
        Filtros
    </button>
    </div>
    </div>
</section>
     
    <div className="max-w-7xl mx-auto px-4 py-12">
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
       
    <div className={`${filtersOpen ? 'block' : 'hidden'} lg:block lg:col-span-1`}>
    <div className="bg-gradient-to-b from-turquoise/5 to-gold/5 rounded-lg p-6 sticky top-40 border-2 border-turquoise/20">
    <div className="flex items-center justify-between mb-6">
    <h3 className="text-lg font-bold text-dark">Filtros</h3>
    {filtrosActivos && (
    <button
    onClick={limpiarFiltros}
     className="text-sm text-turquoise hover:text-gold font-semibold flex items-center gap-1 transition"
    >
    <X size={16} />
    Limpiar
    </button>
)}
    </div>

    <div className="mb-6">
    <h4 className="font-semibold text-dark mb-3">Género</h4>
    <div className="space-y-2">
     {generos.map((genero) => (
        <label key={genero} className="flex items-center gap-3 cursor-pointer hover:text-turquoise transition">
        <input
        type="radio"
        name="genero"
        value={genero}
        checked={selectedGenero === genero}
        onChange={(e) => setSelectedGenero(e.target.value)}
        className="w-4 h-4 accent-turquoise"
        />
        <span className="text-gray-700 capitalize">{genero}</span>
    </label>
 ))}
    <label className="flex items-center gap-3 cursor-pointer hover:text-turquoise transition">
        <input
        type="radio"
        name="genero"
        value=""
        checked={selectedGenero === ''}
        onChange={(e) => setSelectedGenero(e.target.value)}
        className="w-4 h-4 accent-turquoise"
    />
    <span className="text-gray-700">Todos</span>
    </label>
    </div>
    </div>

    <div className="mb-6">
    <h4 className="font-semibold text-dark mb-3">Marca</h4>
    <select
    value={selectedMarca}
    onChange={(e) => setSelectedMarca(e.target.value)}
     className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-turquoise transition bg-white"
    >
    <option value="">Todas las Marcas</option>
      {marcas.map((marca) => (
    <option key={marca} value={marca}>
      {marca}
    </option>
))}
    </select>
    </div>

    <div className="mb-6">
      <h4 className="font-semibold text-dark mb-3">Tipo de Fragancia</h4>
<select
    value={selectedTipo}
    onChange={(e) => setSelectedTipo(e.target.value)}
     className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-turquoise transition bg-white"
    >
    <option value="">Todos los Tipos</option>
      {tipos.map((tipo) => (
    <option key={tipo} value={tipo}>
      {tipo}
    </option>
))}
    </select>
    </div>

    <div>
    <h4 className="font-semibold text-dark mb-3">Rango de Precio</h4>
    <div className="space-y-3">
    <div>
    <label className="text-sm text-gray-600 block mb-1">Mínimo:  ${priceRange.min.toLocaleString()}</label>
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
    <label className="text-sm text-gray-600 block mb-1">Máximo: ${priceRange.max.toLocaleString()}</label>
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
 </div>
</div>
         
    <div className="lg:col-span-3">
            
    <div className="flex items-center justify-between mb-8">
    <p className="text-gray-600 font-semibold">
     {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
    </p>
    <select
      value={sortType}
      onChange={(e) => handleSort(e.target.value)}
       className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-turquoise transition bg-white font-semibold"
    >
    <option value="popular">Más Popular</option>
    <option value="precio-asc">Precio: Menor a Mayor</option>
    <option value="precio-desc">Precio: Mayor a Menor</option>
    <option value="rating">Mejor Calificación</option>
    <option value="newest">Más Nuevo</option>
</select>
    </div>
            
    {filteredProducts.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {filteredProducts.map((product) => (
     <ProductCard key={product.id} producto={product} />
    ))}
    </div>
    ) : (
    <div className="text-center py-16">
    <p className="text-gray-600 text-lg mb-4">
      No se encontraron productos que coincidan con tu búsqueda
    </p>
    <button
      onClick={limpiarFiltros}
         className="px-6 py-3 bg-turquoise text-white font-bold rounded hover:bg-gold hover:text-dark transition"
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