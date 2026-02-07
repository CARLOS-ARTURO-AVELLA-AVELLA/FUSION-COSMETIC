import { useState } from 'react'
import { Heart, Star, ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCartStore } from '../../store/cartStore'
import { isOnSale, isLowStock } from '../../utils/helpers'

export default function ProductCard({ producto }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)
  const addItem = useCartStore((state) => state.addItem)

  const descuentoReal = producto.precio * (1 - producto.descuento / 100)

  const handleAddToCart = () => {
    addItem(producto)
    // Podrías mostrar un toast aquí
  }

  const handleToggleFavorite = (e) => {
    e.preventDefault()
    setIsFavorited(!isFavorited)
  }

  return (
    <div
      className="bg-white rounded-lg overflow-hidden group cursor-pointer transition-all duration-300 card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative h-64 bg-gradient-to-br from-light-bg to-gray-300 overflow-hidden flex items-center justify-center">
        {/* Background Image / Emoji */}
        <div
          className={`text-8xl transition-transform duration-500 ${
            isHovered ? 'scale-125 opacity-30' : 'scale-100 opacity-100'
          }`}
        >
          {producto.imagen}
        </div>

        {/* Overlay on Hover */}
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center gap-2 animate-fade-in">
            <button
              onClick={handleAddToCart}
              className="bg-gold text-dark px-6 py-3 font-bold rounded hover:bg-yellow-500 transition flex items-center gap-2 transform scale-95 hover:scale-100"
            >
              <ShoppingCart size={18} />
              Agregar
            </button>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
          {isOnSale(producto) && (
            <div className="badge badge-red">
              -{producto.descuento}%
            </div>
          )}
          {isLowStock(producto) && (
            <div className="badge badge-orange text-xs">
              Stock limitado
            </div>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleToggleFavorite}
          className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition z-10 group/wish"
          aria-label="Agregar a favoritos"
        >
          <Heart
            size={20}
            className={`transition ${
              isFavorited
                ? 'fill-red-500 text-red-500'
                : 'text-gray-400 group-hover/wish:text-red-500'
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Brand */}
        <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-2 hover:text-gold transition">
          {producto.marca}
        </p>

        {/* Product Name */}
        <Link to={`/productos/${producto.id}`}>
          <h3 className="font-display text-lg font-bold text-dark mb-2 line-clamp-2 hover:text-gold transition">
            {producto.nombre}
          </h3>
        </Link>

        {/* Rating */}
        {producto.rating && (
          <div className="flex items-center gap-2 mb-3">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  fill={i < Math.floor(producto.rating) ? '#D4AF37' : 'none'}
                  color={i < Math.floor(producto.rating) ? '#D4AF37' : '#e0e0e0'}
                  strokeWidth={1.5}
                />
              ))}
            </div>
            <span className="text-xs text-gray-600">
              ({producto.rating})
            </span>
          </div>
        )}

        {/* Price Section */}
        <div className="mb-4 border-t border-gray-200 pt-3">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-2xl font-bold text-gold">
              ${descuentoReal.toFixed(2)}
            </span>
            {isOnSale(producto) && (
              <span className="text-sm text-gray-500 line-through">
                ${producto.precio.toFixed(2)}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Volumen: {producto.volumen}ml
          </p>
        </div>

        {/* Stock Status */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <p className="text-xs text-gray-600">Disponibilidad:</p>
            <span className={`text-xs font-semibold ${
              producto.stock > 10 ? 'text-green-600' : producto.stock > 0 ? 'text-orange-600' : 'text-red-600'
            }`}>
              {producto.stock > 0 ? `${producto.stock} unidades` : 'Agotado'}
            </span>
          </div>
          {/* Stock Bar */}
          <div className="w-full h-1.5 bg-light-bg rounded-full overflow-hidden">
            {producto.stock > 0 && (
              <div
                className="h-full bg-gradient-to-r from-gold to-yellow-500 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((producto.stock / 30) * 100, 100)}%` }}
              ></div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 py-2.5 bg-dark text-white font-bold rounded hover:bg-gold hover:text-dark transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={producto.stock === 0}
          >
            {producto.stock > 0 ? 'Agregar al carrito' : 'Agotado'}
          </button>
          <Link
            to={`/productos/${producto.id}`}
            className="px-3 py-2.5 border-2 border-gray-300 rounded hover:border-gold hover:text-gold transition font-bold text-sm"
          >
            Ver
          </Link>
        </div>

        {/* Product Type Badge */}
        <div className="mt-3 inline-block">
          <span className="text-xs bg-light-bg text-gray-700 px-3 py-1 rounded-full hover:bg-gold hover:text-dark transition">
            {producto.tipo}
          </span>
        </div>
      </div>
    </div>
  )
}