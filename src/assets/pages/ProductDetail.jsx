import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Heart, Star, ShoppingCart, Share2, ChevronLeft } from 'lucide-react'
import { useProductStore } from '../store/productStore'
import { useCartStore } from '../store/cartStore'
import { formatPrice } from '../utils/helpers'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const [isFavorited, setIsFavorited] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  const getProductById = useProductStore((state) => state.getProductById)
  const addItem = useCartStore((state) => state.addItem)
  const producto = getProductById(id)

  if (!producto) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-dark mb-4">
            Producto no encontrado
          </h1>
          <button
            onClick={() => navigate('/productos')}
            className="px-6 py-3 bg-gold text-dark font-bold rounded hover:bg-yellow-500 transition"
          >
            Volver a Productos
          </button>
        </div>
      </div>
    )
  }

  const descuentoReal = producto.precio * (1 - producto.descuento / 100)

  const handleAddToCart = () => {
    addItem({ ...producto, quantity })
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, Math.min(producto.stock, value))
    setQuantity(newQuantity)
  }

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center gap-2 text-sm">
          <Link to="/" className="text-gold hover:underline">
            Inicio
          </Link>
          <span className="text-gray-400">/</span>
          <Link to="/productos" className="text-gold hover:underline">
            Productos
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-dark">{producto.nombre}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Image */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-full aspect-square bg-light-bg rounded-lg flex items-center justify-center mb-8 text-9xl">
              {producto.imagen}
            </div>
          </div>

          {/* Right - Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <p className="text-sm text-gray-500 font-semibold uppercase mb-2">
                {producto.marca}
              </p>
              <h1 className="text-4xl font-bold font-display text-dark mb-4">
                {producto.nombre}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill={
                        i < Math.floor(producto.rating)
                          ? '#D4AF37'
                          : 'none'
                      }
                      color={
                        i < Math.floor(producto.rating)
                          ? '#D4AF37'
                          : '#e0e0e0'
                      }
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {producto.rating} ({producto.resenas} reseñas)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="border-t border-b border-gray-200 py-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold font-display text-gold">
                  {formatPrice(descuentoReal)}
                </span>
                {producto.descuento > 0 && (
                  <span className="text-lg text-gray-500 line-through">
                    {formatPrice(producto.precio)}
                  </span>
                )}
              </div>
              {producto.descuento > 0 && (
                <span className="text-sm text-red-600 font-bold">
                  Ahorra {producto.descuento}%
                </span>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="font-bold text-lg text-dark mb-2 font-display">
                Descripción
              </h3>
              <p className="text-gray-600">
                {producto.descripcion}
              </p>
            </div>

            {/* Specifications */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-bold text-lg text-dark mb-4 font-display">
                Especificaciones
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Volumen:</span>
                  <span className="font-bold text-dark">{producto.volumen}ml</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Género:</span>
                  <span className="font-bold text-dark capitalize">{producto.genero}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tipo:</span>
                  <span className="font-bold text-dark">{producto.tipo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Stock:</span>
                  <span className={`font-bold ${producto.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {producto.stock > 0 ? `${producto.stock} unidades` : 'Agotado'}
                  </span>
                </div>
              </div>
            </div>

            {/* Aromatic Notes */}
            <div>
              <h3 className="font-bold text-lg text-dark mb-4 font-display">
                Notas Aromáticas
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-light-bg p-4 rounded-lg text-center">
                  <p className="text-xs text-gray-600 mb-2">SALIDA</p>
                  <p className="font-bold text-dark text-sm">
                    {producto.notaSalida}
                  </p>
                </div>
                <div className="bg-light-bg p-4 rounded-lg text-center">
                  <p className="text-xs text-gray-600 mb-2">CORAZÓN</p>
                  <p className="font-bold text-dark text-sm">
                    {producto.notaCorazon}
                  </p>
                </div>
                <div className="bg-light-bg p-4 rounded-lg text-center">
                  <p className="text-xs text-gray-600 mb-2">BASE</p>
                  <p className="font-bold text-dark text-sm">
                    {producto.notaBase}
                  </p>
                </div>
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-4">
              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="text-gray-600 font-semibold">Cantidad:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="px-4 py-2 hover:bg-light-bg transition"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 font-bold">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="px-4 py-2 hover:bg-light-bg transition"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={producto.stock === 0}
                className="w-full py-4 bg-gold text-dark font-bold text-lg rounded hover:bg-yellow-500 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} />
                {addedToCart ? '✓ Agregado al carrito' : 'Agregar al carrito'}
              </button>

              {/* Secondary Actions */}
              <div className="flex gap-4">
                <button
                  onClick={() => setIsFavorited(!isFavorited)}
                  className="flex-1 py-3 border-2 border-gray-300 rounded font-bold transition hover:border-gold hover:text-gold flex items-center justify-center gap-2"
                >
                  <Heart
                    size={20}
                    fill={isFavorited ? 'currentColor' : 'none'}
                  />
                  {isFavorited ? 'Favorito' : 'Añadir favorito'}
                </button>
                <button className="flex-1 py-3 border-2 border-gray-300 rounded font-bold transition hover:border-gold hover:text-gold flex items-center justify-center gap-2">
                  <Share2 size={20} />
                  Compartir
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}