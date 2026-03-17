import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductCard from '../components/products/ProductCard'
import { useProductStore } from '../store/productStore'

export default function Marcas() {
  const navigate = useNavigate()
  const { products, filteredProducts, filterProducts, sortProducts } = useProductStore()
  const [sortType, setSortType] = useState('popular')
  const [selectedMarca, setSelectedMarca] = useState('')

  const marcas = [...new Set(products.map(p => p.marca))].sort()


  useEffect(() => {
    if (selectedMarca) {
      filterProducts({ marca: selectedMarca })
    } else {
      filterProducts({})
    }
  }, [selectedMarca])

  const handleSort = (newSortType) => {
    setSortType(newSortType)
    sortProducts(newSortType)
  }

  return (
    <div className="min-h-screen bg-white">
     
    <section className="bg-gradient-to-r from-turquoise to-gold py-16 border-b-2 border-turquoise/20">
       <div className="max-w-7xl mx-auto px-4">
       <h1 className="text-5xl font-bold font-display text-white mb-3">
       Nuestras Marcas
       </h1>
       <p className="text-white/90 text-lg max-w-2xl">
       Descubre todas nuestras marcas premium de fragancias. Desde clásicos internacionales 
       hasta marcas de nicho exclusivas, encuentra tu marca favorita.
       </p>
    </div>
    </section>

    <section className="sticky top-20 bg-white shadow-md z-20 py-6 border-b-2 border-turquoise/20">
        <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
    <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
        Selecciona una Marca
        </label>
    <select
        value={selectedMarca}
        onChange={(e) => setSelectedMarca(e.target.value)}
         className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-turquoise transition bg-white font-semibold"
    >
        <option value="">Todas las Marcas</option>
        {marcas.map((marca) => (
        <option key={marca} value={marca}>
        {marca}
        </option>
))}
    </select>
    </div>

    <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
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
    </div>
    </section>

    <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          
        <div className="mb-8">
        <h2 className="text-3xl font-bold text-dark mb-2">
        {selectedMarca ? `Productos de ${selectedMarca}` : 'Todos nuestros Productos'}
        </h2>
        <p className="text-gray-600 font-semibold">
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
        <p className="text-gray-600 text-lg mb-4">
        No se encontraron productos para esta marca
        </p>
        <button
        onClick={() => setSelectedMarca('')}
         className="px-6 py-3 bg-turquoise text-white font-bold rounded hover:bg-gold hover:text-dark transition"
    >
        Ver Todas las Marcas
        </button>
        </div>
)}
    </div>
    </section>

    <section className="py-16 bg-gradient-to-b from-turquoise/10 to-gold/10">
        <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-dark text-center mb-12">
        ¿Por qué nuestras marcas?
        </h2>
          
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition group">
        <div className="h-64 bg-gradient-to-b from-gray-100 to-gray-50 flex items-center justify-center overflow-hidden relative">
        <img 
        src="/images/mujer/PecheM.png" 
        alt="Fragancia Auténtica"
         className="h-56 w-56 object-contain group-hover:scale-105 transition"
    />
    </div>
        <div className="p-8">
        <h3 className="text-xl font-bold text-dark mb-3">100% Auténticas</h3>
        <p className="text-gray-600">
        Todas nuestras marcas son garantizadas auténticas y directamente de distribuidores oficiales.
        </p>
    </div>
    </div>

        <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition group">
        <div className="h-64 bg-gradient-to-b from-gray-100 to-gray-50 flex items-center justify-center overflow-hidden relative">
        <img 
        src="/images/hombre/xpolo.jpg" 
        alt="Premium Quality"
         className="h-56 w-56 object-contain group-hover:scale-105 transition"
    />
    </div>
        <div className="p-8">
        <h3 className="text-xl font-bold text-dark mb-3">Premium Quality</h3>
        <p className="text-gray-600">
        Seleccionamos cuidadosamente cada marca para garantizar la mejor calidad en fragancias.
        </p>
    </div>
    </div>

        <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition group">
        <div className="h-64 bg-gradient-to-b from-gray-100 to-gray-50 flex items-center justify-center overflow-hidden relative">
        <img 
        src="/images/hombre/TomFord.png" 
        alt="Variedad Completa"
         className="h-56 w-56 object-contain group-hover:scale-105 transition"
    />
    </div>
        <div className="p-8">
        <h3 className="text-xl font-bold text-dark mb-3">Variedad Completa</h3>
        <p className="text-gray-600">
        Desde marcas clásicas internacionales hasta marcas de nicho exclusivas y emergentes.
        </p>
    </div>
    </div>
    </div>
    </div>
    </section>

    <section className="py-16 bg-gradient-to-r from-turquoise to-gold">
        <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold font-display text-white mb-6">
        ¿No encuentras la marca que buscas?
        </h2>
        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
        Contáctanos y buscaremos la fragancia perfecta para ti.
        </p>
        <button
        onClick={() => navigate('/contacto')}
         className="px-8 py-4 bg-white text-turquoise font-bold rounded-full hover:bg-gray-100 transition duration-300 text-lg shadow-lg"
    >
        Contactar
        </button>
    </div>
    </section>
    </div>
  )
}