import { Link, useNavigate } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react'
import { useCartStore } from '../store/cartStore'

export default function Cart() {
  const items = useCartStore((state) => state.items)
const navigate = useNavigate() 
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeItem = useCartStore((state) => state.removeItem)
  const clearCart = useCartStore((state) => state.clearCart)

  const subtotal = items.reduce((total, item) => total + (item.precio * item.quantity), 0)
  const taxes = subtotal * 0.19
  const total = subtotal + taxes

  if (items.length === 0) {
    return (
  <div className="min-h-screen bg-white">
  <section className="bg-gradient-to-r from-turquoise to-gold py-16">
   <div className="max-w-7xl mx-auto px-4">
    <h1 className="text-5xl font-bold font-display text-white mb-2">Mi Carrito</h1>
    <p className="text-white/90 text-lg">Tu carrito de compras</p>
   </div>
  </section>
        
   <div className="flex items-center justify-center py-20">
   <div className="text-center">
    <ShoppingBag size={80} className="mx-auto mb-6 text-gray-300" />
    <h2 className="text-4xl font-bold font-display text-dark mb-4">Tu carrito está vacío</h2>
    <p className="text-gray-600 mb-8 text-lg max-w-md mx-auto">
    Explora nuestros productos y agrega tus fragancias favoritas
    </p>
    <Link 
    to="/productos" 
     className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-turquoise to-teal-600 text-white font-bold rounded-lg hover:shadow-lg transition duration-300 text-lg"
    >
    <ShoppingBag size={20} />
    Ir a Productos
    </Link>
  </div>
  </div>
  </div>
  )
}

  return (
  <div className="min-h-screen bg-white">

  <section className="bg-gradient-to-r from-turquoise to-gold py-16">
  <div className="max-w-7xl mx-auto px-4">
  <h1 className="text-5xl font-bold font-display text-white mb-2">Mi Carrito</h1>
    <p className="text-white/90 text-lg">{items.length} producto{items.length !== 1 ? 's' : ''}</p>
    </div>
  </section>
     
  <div className="max-w-7xl mx-auto px-4 py-12">
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
  <div className="lg:col-span-2">
  <div className="space-y-4">
    {items.map((item) => {
    const price = item.precio * (1 - item.descuento / 100)
    const itemTotal = price * item.quantity

  return (
  <div key={item.id} className="bg-white border-2 border-turquoise/20 rounded-xl p-6 hover:shadow-lg transition">
  <div className="flex gap-6 items-start">
                      
  <div className="w-24 h-24 bg-gradient-to-b from-gray-100 to-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
    <img 
    src={item.imagen} 
    alt={item.nombre}
    
    />
  </div>

  <div className="flex-1">
    <h3 className="font-bold text-lg text-dark mb-1">{item.nombre}</h3>
    <p className="text-sm text-gray-600 mb-3">{item.marca}</p>
                        
    {item.descuento > 0 && (
    <div className="flex gap-2 items-center mb-2">
    <span className="text-lg font-bold text-turquoise">${price.toFixed(2)}</span>
      <span className="text-sm line-through text-gray-400">${item.precio.toFixed(2)}</span>
      <span className="bg-red-500 text-white px-2 py-0.5 rounded text-xs font-bold">-{item.descuento}%</span>
  </div>
)}
    {item.descuento === 0 && (
    <p className="text-lg font-bold text-turquoise mb-2">${price.toFixed(2)}</p>
)}

    <p className="text-xs text-gray-500">💧 {item.volumen}ml</p>
  </div>

  <div className="flex flex-col items-end gap-4">
  
  <div className="flex items-center border-2 border-turquoise/30 rounded-lg bg-turquoise/5">
  <button 
    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} 
     className="px-3 py-2 hover:bg-turquoise/20 transition text-turquoise"
  >
  <Minus size={16} />
  </button>
  <span className="px-4 font-bold text-dark min-w-12 text-center">{item.quantity}</span>
  <button 
    onClick={() => updateQuantity(item.id, item.quantity + 1)} 
     className="px-3 py-2 hover:bg-turquoise/20 transition text-turquoise"
>
    <Plus size={16} />
  </button>
</div>

  <div className="text-right">
  <p className="text-xs text-gray-600 mb-1">Subtotal</p>
    <p className="font-bold text-lg text-turquoise">${itemTotal.toFixed(2)}</p>
  </div>

  <button 
  onClick={() => removeItem(item.id)} 
   className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
  title="Eliminar del carrito"
  >
  <Trash2 size={20} />
  </button>
  </div>
  </div>
  </div>
 )
})}
  </div>
  </div>

  <div className="lg:col-span-1">
  <div className="bg-gradient-to-b from-turquoise/10 to-gold/10 rounded-xl p-8 border-2 border-turquoise/20 sticky top-24">
  <h2 className="text-2xl font-bold text-dark mb-8">Resumen del Pedido</h2>


  <div className="space-y-4 mb-6 pb-6 border-b-2 border-turquoise/20">
  <div className="flex justify-between">
  <span className="text-gray-700">Subtotal:</span>
   <span className="font-bold text-dark">${subtotal.toFixed(2)}</span>
  </div>
  <div className="flex justify-between">
   <span className="text-gray-700">Impuestos (19%):</span>
   <span className="font-bold text-dark">${taxes.toFixed(2)}</span>
  </div>
  <div className="flex justify-between">
   <span className="text-gray-700">Envío:</span>
   <span className="font-bold text-green-600">GRATIS ✓</span>
  </div>
  </div>

  <div className="mb-8 text-center">
   <p className="text-sm text-gray-600 mb-2">Monto Total</p>
   <p className="text-4xl font-bold text-turquoise">${total.toFixed(2)}</p>
  </div>

  <div className="space-y-3">
  <button 
  onClick={() => navigate('/checkout')}
  className="w-full py-4 bg-gradient-to-r from-turquoise to-teal-600 text-white font-bold rounded-lg hover:shadow-lg transition duration-300 text-lg"
>
  Proceder al Pago
</button> 

  <Link 
   to="/productos" 
   className="flex items-center justify-center gap-2 w-full py-3 border-2 border-turquoise text-turquoise font-bold rounded-lg hover:bg-turquoise/5 transition duration-300"
  >
   <ArrowLeft size={20} />
   Continuar Comprando
  </Link>

   <button 
   onClick={clearCart}
   className="w-full py-3 text-red-500 font-bold hover:bg-red-50 rounded-lg transition"
                >
    Limpiar Carrito
  </button>
        </div>
      </div>
     </div>
    </div>
   </div>
  </div>
)
}