import { useParams, useNavigate, Link } from 'react-router-dom'
import { Heart, ShoppingCart } from 'lucide-react'
import { useProductStore } from '../store/productStore'
import { useCartStore } from '../store/cartStore'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const producto = useProductStore((state) => state.getProductById(id))
  const addItem = useCartStore((state) => state.addItem)

  if (!producto) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-dark mb-4">Producto no encontrado</h1>
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

  const descuento = producto.precio * (1 - producto.descuento / 100)

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link to="/" className="text-gold hover:underline">Inicio</Link> / 
        <Link to="/productos" className="text-gold hover:underline ml-2">Productos</Link> / 
        <span className="ml-2 text-dark">{producto.nombre}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="h-96 bg-light-bg rounded-lg flex items-center justify-center text-9xl">
            {producto.imagen}
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500 uppercase mb-2">{producto.marca}</p>
              <h1 className="text-4xl font-bold font-display text-dark mb-4">{producto.nombre}</h1>
            </div>

            <div className="border-t border-b border-gray-200 py-6">
              <p className="text-4xl font-bold text-gold">${descuento.toFixed(2)}</p>
              {producto.descuento > 0 && (
                <p className="text-sm line-through text-gray-500">${producto.precio.toFixed(2)}</p>
              )}
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">Descripción</h3>
              <p className="text-gray-600">{producto.descripcion}</p>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => addItem(producto)} 
                className="flex-1 py-3 bg-gold text-dark font-bold rounded hover:bg-yellow-500 transition flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} /> Agregar al Carrito
              </button>
              <button className="px-6 py-3 border-2 border-gray-300 rounded hover:border-gold hover:text-gold transition">
                <Heart size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}