import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductCard from '../components/products/ProductCard'
import { useProductStore } from '../store/productStore'
import { Zap, TrendingDown, Clock } from 'lucide-react'

export default function Ofertas() {
  const navigate = useNavigate()
  const { products, filteredProducts, filterProducts, sortProducts } = useProductStore()
  const [sortType, setSortType] = useState('descuento-desc')
  const [tipoOferta, setTipoOferta] = useState('todas')

  // Filtrar productos con descuento al cargar
  useEffect(() => {
    filterProducts({ discount: true })
    sortProducts('descuento-desc')
  }, [])

  // Aplicar ordenamiento
  const handleSort = (newSortType) => {
    setSortType(newSortType)
    sortProducts(newSortType)
  }

  // Filtrar por tipo de oferta
  const productosFiltrados = filteredProducts.filter((product) => {
    if (tipoOferta === 'todas') return true
    if (tipoOferta === 'super-descuento') return product.descuento >= 30
    if (tipoOferta === 'descuento-medio') return product.descuento >= 15 && product.descuento < 30
    if (tipoOferta === 'descuento-pequeno') return product.descuento > 0 && product.descuento < 15
    return true
  })

  // Productos más vendidos en oferta
  const productosDestacados = productosFiltrados.sort((a, b) => b.resenas - a.resenas).slice(0, 3)

  // Calcular ahorro total
  const ahorroTotal = productosFiltrados.reduce((acc, product) => {
    return acc + (product.precio * product.descuento / 100)
  }, 0)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-turquoise to-gold py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <Zap size={40} className="text-white" />
            <h1 className="text-5xl font-bold font-display text-white">
              Ofertas y Descuentos
            </h1>
          </div>
          <p className="text-white/90 text-lg max-w-2xl mb-6">
            Descubre nuestras mejores ofertas en fragancias premium. Ahorra en los perfumes que amas con descuentos exclusivos por tiempo limitado.
          </p>
          <div className="bg-white/20 backdrop-blur rounded-lg p-6 max-w-md">
            <p className="text-white text-sm font-semibold mb-2">Ahorro Total Disponible</p>
            <p className="text-4xl font-bold text-white">
              ${ahorroTotal.toFixed(2)}
            </p>
          </div>
        </div>
      </section>

      {/* Filtros y Ordenamiento */}
      <section className="sticky top-20 bg-white shadow-md z-20 py-6 border-b-2 border-turquoise/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Filtro por tipo de oferta */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Tipo de Oferta
              </label>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setTipoOferta('todas')}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    tipoOferta === 'todas'
                      ? 'bg-turquoise text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Todas
                </button>
                <button
                  onClick={() => setTipoOferta('super-descuento')}
                  className={`px-4 py-2 rounded-lg font-semibold transition flex items-center gap-2 ${
                    tipoOferta === 'super-descuento'
                      ? 'bg-turquoise text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Zap size={18} />
                  30%+
                </button>
                <button
                  onClick={() => setTipoOferta('descuento-medio')}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    tipoOferta === 'descuento-medio'
                      ? 'bg-turquoise text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  15-30%
                </button>
                <button
                  onClick={() => setTipoOferta('descuento-pequeno')}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    tipoOferta === 'descuento-pequeno'
                      ? 'bg-turquoise text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  0-15%
                </button>
              </div>
            </div>

            {/* Ordenamiento */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Ordenar Por
              </label>
              <select
                value={sortType}
                onChange={(e) => handleSort(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-turquoise transition bg-white font-semibold"
              >
                <option value="descuento-desc">Mayor Descuento</option>
                <option value="precio-asc">Precio: Menor a Mayor</option>
                <option value="precio-desc">Precio: Mayor a Menor</option>
                <option value="rating">Mejor Calificación</option>
                <option value="popular">Más Popular</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Productos Destacados en Oferta */}
      {productosDestacados.length > 0 && (
        <section className="py-12 bg-gradient-to-b from-turquoise/10 to-gold/10">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold font-display text-dark mb-8 flex items-center gap-3">
              <Zap className="text-turquoise" size={32} />
              Ofertas Destacadas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {productosDestacados.map((product) => (
                <div key={product.id} className="relative group">
                  <ProductCard producto={product} />
                  {product.descuento > 0 && (
                    <div className="absolute top-4 right-4 bg-turquoise text-white px-4 py-2 rounded-lg font-bold text-lg shadow-lg">
                      -{product.descuento}%
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Todos los Productos en Oferta */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold font-display text-dark mb-8">
            Todos los Productos en Oferta
          </h2>

          {/* Contador */}
          <p className="text-gray-600 mb-8 font-semibold">
            {productosFiltrados.length} producto{productosFiltrados.length !== 1 ? 's' : ''} con descuento
          </p>

          {productosFiltrados.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {productosFiltrados.map((product) => (
                <div key={product.id} className="relative group">
                  <ProductCard producto={product} />
                  {/* Badge de descuento */}
                  {product.descuento > 0 && (
                    <div className="absolute top-4 right-4 bg-turquoise text-white px-3 py-1 rounded-lg font-bold shadow-lg">
                      -{product.descuento}%
                    </div>
                  )}
                  {/* Badge de más vendido */}
                  {product.resenas > 300 && (
                    <div className="absolute top-4 left-4 bg-gold text-dark px-3 py-1 rounded-lg text-sm font-semibold shadow-lg">
                      ⭐ Más Vendido
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <TrendingDown size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 text-lg mb-4">
                No hay productos con descuento en este rango
              </p>
              <button
                onClick={() => setTipoOferta('todas')}
                className="px-6 py-3 bg-turquoise text-white font-bold rounded hover:bg-gold hover:text-dark transition"
              >
                Ver Todas las Ofertas
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Sección de Información */}
      <section className="py-16 bg-gradient-to-b from-turquoise/10 to-gold/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition">
              <Zap size={40} className="mx-auto text-turquoise mb-4" />
              <h3 className="text-xl font-bold text-dark mb-2">Ofertas Limitadas</h3>
              <p className="text-gray-600">
                Nuestras ofertas cambian regularmente. No te pierdas los mejores descuentos.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition">
              <TrendingDown size={40} className="mx-auto text-gold mb-4" />
              <h3 className="text-xl font-bold text-dark mb-2">Precios Competitivos</h3>
              <p className="text-gray-600">
                Los mejores precios garantizados en todas nuestras fragancias premium.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition">
              <Clock size={40} className="mx-auto text-turquoise mb-4" />
              <h3 className="text-xl font-bold text-dark mb-2">Ofertas Exclusivas</h3>
              <p className="text-gray-600">
                Suscríbete para recibir alertas sobre nuestras mejores ofertas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-turquoise to-gold">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold font-display text-white mb-6">
            ¿No encontraste lo que buscas?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Navega por todas nuestras fragancias y encuentra la oferta perfecta para ti.
          </p>
          <button
            onClick={() => navigate('/productos')}
            className="px-8 py-4 bg-white text-turquoise font-bold rounded-full hover:bg-gray-100 transition duration-300 text-lg shadow-lg"
          >
            Ver Todos los Productos
          </button>
        </div>
      </section>
    </div>
  )
}