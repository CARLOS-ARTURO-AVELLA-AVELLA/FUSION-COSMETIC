import { Heart, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCartStore } from '../../store/cartStore'
import { useWishlistStore } from '../../store/wishlistStore'

export default function ProductCard({ producto }) {
  const addItem = useCartStore((state) => state.addItem)
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore()
  
  const descuento = producto.precio * (1 - producto.descuento / 100)
  const estaEnWishlist = isInWishlist(producto.id)

  const handleWishlist = () => {
    if (estaEnWishlist) {
      removeFromWishlist(producto.id)
    } else {
      addToWishlist(producto)
    }
  }

  return (
  <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      
  <div className="relative w-full h-64 bg-gradient-to-b from-gray-100 to-gray-50 flex items-center justify-center overflow-hidden">
  <div className="absolute inset-0 opacity-5">
  <div className="absolute top-0 right-0 w-40 h-40 bg-turquoise rounded-full blur-3xl"></div>
  <div className="absolute bottom-0 left-0 w-32 h-32 bg-gold rounded-full blur-3xl"></div>
  </div>

  <img 
    src={producto.imagen} 
    alt={producto.nombre} 
    className="h-56 w-56 object-contain drop-shadow-sm relative z-10"
  />

    {producto.descuento > 0 && (
  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-sm shadow-lg z-20">
    -{producto.descuento}%
  </div>
)}

  <button
    onClick={handleWishlist}
     className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all z-20 hover:scale-110"
  >
  <Heart
    size={20}
    fill={estaEnWishlist ? '#FF1744' : 'none'}
    color={estaEnWishlist ? '#FF1744' : '#999'}
    className="transition-colors"
  />
  </button>
  </div>

  <div className="p-5 flex-1 flex flex-col">
  <p className="text-xs text-gray-500 uppercase tracking-wide mb-2 font-semibold">
    {producto.marca}
  </p>

  <Link to={`/productos/${producto.id}`}>
  <h3 className="font-bold text-base text-dark hover:text-turquoise transition line-clamp-2 mb-3">
    {producto.nombre}
  </h3>
  </Link>

  <div className="flex items-center gap-2 mb-3">
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
  <Star 
    key={i} 
    size={14} 
    fill={i < Math.floor(producto.rating) ? '#20B2AA' : 'none'} 
    color={i < Math.floor(producto.rating) ? '#20B2AA' : '#e0e0e0'} 
  />
))}
  </div>
  <span className="text-xs text-gray-500">({producto.resenas})</span>
  </div>

  <div className="text-xs text-gray-600 mb-3 space-y-1">
  <p>💧 {producto.volumen}ml</p>
  <p>🏷️ {producto.tipo}</p>
  </div>

  <div className="flex items-center gap-2 mb-4"></div>
  <p className="text-2xl font-bold text-turquoise">
    ${descuento.toFixed(2)}
  </p>
    {producto.descuento > 0 && (
  <p className="text-sm line-through text-gray-400">
    ${producto.precio.toFixed(2)}
  </p>
)}
  </div>

  <button 
    onClick={() => addItem(producto)} 
     className="w-full py-3 bg-gradient-to-r from-dark to-slate-800 text-white font-bold rounded-lg hover:from-turquoise hover:to-gold hover:text-dark transition-all duration-300 shadow-md hover:shadow-lg"
  >
    Agregar al Carrito
  </button>
</div>
)
}