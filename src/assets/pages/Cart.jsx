import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import { useCartStore } from '../../store/cartStore'
import { formatPrice, calculateSubtotal, calculateTaxes, calculateTotal } from '../../utils/helpers'

export default function Cart() {
  const items = useCartStore((state) => state.items)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeItem = useCartStore((state) => state.removeItem)
  const clearCart = useCartStore((state) => state.clearCart)

  const subtotal = calculateSubtotal(items)
  const taxes = calculateTaxes(subtotal)
  const total = calculateTotal(items)

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag size={64} className="mx-auto mb-6 text-gray-300" />
          <h1 className="text-4xl font-bold font-display text-dark mb-4">
            Tu carrito está vacío
          </h1>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Explora nuestros productos y agrega tus fragancias favoritas
          </p>
          <Link
            to="/productos"
            className="inline-block px-8 py-3 bg-gold text-dark font-bold rounded hover:bg-yellow-500 transition"
          >
            Ir a Productos
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-dark to-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold font-display">Mi Carrito</h1>
          <p className="text-gray-300 mt-2">{items.length} producto(s)</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Items List */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => {
                const price = item.precio * (1 - item.descuento / 100)
                const itemTotal = price * item.quantity

                return (
                  <div
                    key={item.id}
                    className="border border-gray-200 rounded-lg p-6 flex gap-6"
                  >
                    {/* Image */}
                    <div className="w-24 h-24 bg-light-bg rounded-lg flex items-center justify-center text-4xl flex-shrink-0">
                      {item.imagen}
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-dark font-display">
                        {item.nombre}
                      </h3>
                      <p className="text-sm text-gray-600">{item.marca}</p>
                      <p className="text-sm text-gray-600 mt-2">
                        Volumen: {item.volumen}ml
                      </p>

                      {/* Price */}
                      <div className="mt-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-gold">
                            {formatPrice(price)}
                          </span>
                          {item.descuento > 0 && (
                            <span className="text-sm line-through text-gray-500">
                              {formatPrice(item.precio)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Quantity & Actions */}
                    <div className="flex flex-col items-end gap-4">
                      {/* Quantity */}
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-3 py-2 hover:bg-light-bg"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 font-bold">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-3 py-2 hover:bg-light-bg"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      {/* Total */}
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Subtotal</p>
                        <p className="font-bold text-lg text-dark">
                          {formatPrice(itemTotal)}
                        </p>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-800 transition p-2"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            <Link
              to="/productos"
              className="inline-block mt-8 px-6 py-2 text-gold font-bold hover:underline"
            >
              ← Continuar comprando
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-light-bg rounded-lg p-8 sticky top-24">
              <h2 className="text-2xl font-bold font-display text-dark mb-6">
                Resumen del Pedido
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-bold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Impuestos (19%):</span>
                  <span className="font-bold">{formatPrice(taxes)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Envío:</span>
                  <span className="font-bold text-green-600">GRATIS ✓</span>
                </div>
              </div>

              <div className="border-t border-gray-300 pt-6 mb-8">
                <div className="flex justify-between mb-2">
                  <span className="font-display text-lg font-bold">Total:</span>
                  <span className="font-display text-2xl font-bold text-gold">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              <button className="w-full py-3 bg-gold text-dark font-bold rounded-lg hover:bg-yellow-500 transition mb-4">
                Proceder al Pago
              </button>

              <button
                onClick={() => clearCart()}
                className="w-full py-2 border border-red-500 text-red-600 font-bold rounded-lg hover:bg-red-50 transition"
              >
                Limpiar Carrito
              </button>

              {/* Badges */}
              <div className="mt-8 space-y-2 text-center text-sm text-gray-600">
                <p>🔒 Compra segura con SSL</p>
                <p>✓ 100% Auténtico</p>
                <p>🚚 Envío rápido a todo el país</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}