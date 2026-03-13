import { useNavigate, useParams } from 'react-router-dom'
import { useProductStore } from '../store/productStore'
import ProductCard from '../components/products/ProductCard'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

export default function OlfactiveFamilies() {
  const navigate = useNavigate()
  const { familia } = useParams()
  const products = useProductStore((state) => state.products)
  const [sortBy, setSortBy] = useState('popular')

  // Todas las familias olfativas
  const families = [
    { id: 'floral', nombre: 'Floral', imagen: '/images/floral.png' },
    { id: 'citrica', nombre: 'Cítrica', imagen: '/images/citrica.jpg' },
    { id: 'amaderada', nombre: 'Amaderada', imagen: '/images/amaderada.jpg' },
    { id: 'oriental', nombre: 'Oriental', imagen: '/images/oriental.jpg' },
    { id: 'chipre', nombre: 'Chipre', imagen: '/images/chipre.png' },
    { id: 'fougere', nombre: 'Fougère', imagen: '/images/fougere.png' },
    { id: 'gourmand', nombre: 'Gourmand', imagen: '/images/gourmand.jpg' },
    { id: 'especiada', nombre: 'Especiada', imagen: '/images/espaciada.jpg' },
  ]

  // Familia actual (primera si no hay seleccionada)
  const currentFamily = familia || families[0].id
  const currentFamilyObj = families.find(f => f.id === currentFamily)

  // Filtrar productos por familia (case-insensitive)
  const filteredProducts = products.filter(p => 
    p.tipo.toLowerCase() === currentFamily.toLowerCase() ||
    (currentFamily === 'oriental' && p.tipo.toLowerCase() === 'oriental/ambarado') ||
    (currentFamily === 'especiada' && p.tipo.toLowerCase() === 'especiada')
  )

  // Ordenar
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch(sortBy) {
      case 'precio-asc':
        return a.precio - b.precio
      case 'precio-desc':
        return b.precio - a.precio
      case 'rating':
        return b.rating - a.rating
      case 'nuevo':
        return b.id - a.id
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-turquoise to-gold py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold font-display text-white mb-2">Familias Olfativas</h1>
          <p className="text-white/90">Encuentra tu fragancia perfecta por tipo</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Grid de Familias */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-dark mb-8">Selecciona una familia olfativa</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {families.map((fam) => (
              <button
                key={fam.id}
                onClick={() => navigate(`/familias-olfativas/${fam.id}`)}
                className={`group relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition h-48 ${
                  currentFamily === fam.id 
                    ? 'ring-4 ring-turquoise' 
                    : ''
                }`}
              >
                <img 
                  src={fam.imagen} 
                  alt={fam.nombre}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end justify-center p-4">
                  <h3 className="font-bold text-white text-lg text-center">{fam.nombre}</h3>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Productos de la familia seleccionada */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-dark mb-2">
                Fragancias {currentFamilyObj?.nombre}
              </h2>
              <p className="text-gray-600">
                {sortedProducts.length} producto{sortedProducts.length !== 1 ? 's' : ''} encontrado{sortedProducts.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Filtro de Ordenamiento */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border-2 border-turquoise rounded-lg focus:outline-none appearance-none bg-white cursor-pointer pr-10"
              >
                <option value="popular">Popular</option>
                <option value="precio-asc">Menor precio</option>
                <option value="precio-desc">Mayor precio</option>
                <option value="rating">Mejor rating</option>
                <option value="nuevo">Más nuevo</option>
              </select>
              <ChevronDown size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-turquoise pointer-events-none" />
            </div>
          </div>

          {/* Grid de Productos */}
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} producto={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600 mb-4">
                No hay productos en esta familia olfativa
              </p>
              <button
                onClick={() => navigate('/productos')}
                className="px-6 py-3 bg-turquoise text-white font-bold rounded-lg hover:bg-teal-600 transition"
              >
                Ver todos los productos
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}