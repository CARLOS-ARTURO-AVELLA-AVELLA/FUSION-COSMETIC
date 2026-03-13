import { useNavigate } from 'react-router-dom'
import ProductCard from '../components/products/ProductCard'
import { useWishlistStore } from '../store/wishlistStore'
import { Heart, ShoppingCart, Trash2 } from 'lucide-react'

export default function Wishlist() {
  const navigate = useNavigate()
  const { wishlistItems, clearWishlist } = useWishlistStore()

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Colores de marca */}
      <section className="bg-gradient-to-r from-turquoise to-gold py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <Heart size={40} className="text-white fill-white" />
            <h1 className="text-5xl font-bold font-display text-white">
              Mi Wishlist
            </h1>
          </div>
          <p className="text-white/90 text-lg">
            Tus productos favoritos en un solo lugar
          </p>
        </div>
      </section>

      {/* Contenido */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          {wishlistItems.length > 0 ? (
            <>
              {/* Contador y Botones */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-dark mb-2">
                    Mis Favoritos
                  </h2>
                  <p className="text-gray-600 font-semibold">
                    {wishlistItems.length} producto{wishlistItems.length !== 1 ? 's' : ''} guardado{wishlistItems.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <button
                  onClick={clearWishlist}
                  className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition duration-300 shadow-md hover:shadow-lg"
                >
                  <Trash2 size={20} />
                  Limpiar Wishlist
                </button>
              </div>

              {/* Grid de Productos */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {wishlistItems.map((product) => (
                  <ProductCard key={product.id} producto={product} />
                ))}
              </div>

              {/* Resumen - Con colores de marca */}
              <div className="bg-gradient-to-r from-turquoise/10 via-white to-gold/10 rounded-xl p-8 border-2 border-turquoise/30 shadow-sm">
                <h3 className="text-2xl font-bold text-dark mb-4">
                  Próximo paso
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Revisa estos productos cuando estés listo para comprar. Todos están disponibles en nuestro catálogo con los mejores precios garantizados.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => navigate('/productos')}
                    className="flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-turquoise to-teal-600 text-white font-bold rounded-lg hover:shadow-lg transition duration-300"
                  >
                    <ShoppingCart size={20} />
                    Ir al Catálogo
                  </button>
                  <button
                    onClick={() => navigate('/')}
                    className="flex items-center justify-center gap-2 px-8 py-3 bg-gray-200 text-dark font-bold rounded-lg hover:bg-gray-300 transition duration-300"
                  >
                    Seguir Comprando
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <Heart size={80} className="mx-auto text-gray-300 mb-6" />
              <h2 className="text-4xl font-bold text-dark mb-4">
                Tu Wishlist está vacío
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
                Agrega productos a tu wishlist haciendo clic en el corazón. 
                Así podrás guardar tus favoritos para después.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/productos')}
                  className="px-10 py-4 bg-gradient-to-r from-turquoise to-teal-600 text-white font-bold rounded-lg hover:shadow-lg transition duration-300 text-lg shadow-md"
                >
                  Explorar Productos
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="px-10 py-4 bg-gray-200 text-dark font-bold rounded-lg hover:bg-gray-300 transition duration-300 text-lg"
                >
                  Volver al Inicio
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}