import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, Download, Home } from 'lucide-react'

export default function CheckoutConfirmation() {
  const navigate = useNavigate()
  const [orderData, setOrderData] = useState(null)

  useEffect(() => {
    const saved = sessionStorage.getItem('lastOrder')
    
    if (saved) {
      setOrderData(JSON.parse(saved))
      sessionStorage.removeItem('lastOrder')
    }
  }, [])

  if (!orderData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <button onClick={() => navigate('/carrito')}>Volver al Carrito</button>
      </div>
    )
  }

  const { orderNumber, items, formData, payment, total, timestamp } = orderData

  const paymentLabels = {
    tarjeta: 'Tarjeta de Crédito/Débito',
    paypal: 'PayPal',
    transferencia: 'Transferencia Bancaria',
    breb: 'Bre-B'
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-turquoise to-gold py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <CheckCircle size={64} className="mx-auto text-white mb-4" />
          <h1 className="text-4xl font-bold font-display text-white mb-2">¡Pedido Confirmado!</h1>
          <p className="text-white/90">Tu compra ha sido procesada exitosamente</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-turquoise/10 to-gold/10 rounded-xl p-8 border-2 border-turquoise/20 mb-8 text-center">
          <p className="text-gray-600 mb-2">Número de Pedido</p>
          <p className="text-4xl font-bold text-turquoise font-mono mb-4">{orderNumber}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl border-2 border-turquoise/20 p-6">
            <h3 className="text-xl font-bold text-dark mb-4">Información del Cliente</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-600">Nombre</p>
                <p className="font-bold text-dark">{formData.nombre}</p>
              </div>
              <div>
                <p className="text-gray-600">Email</p>
                <p className="font-bold text-dark">{formData.email}</p>
              </div>
              <div>
                <p className="text-gray-600">Teléfono</p>
                <p className="font-bold text-dark">{formData.telefono}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border-2 border-turquoise/20 p-6">
            <h3 className="text-xl font-bold text-dark mb-4">Dirección de Entrega</h3>
            <div className="space-y-2 text-sm">
              <p className="font-bold text-dark">{formData.calle}</p>
              <p className="text-gray-600">{formData.ciudad}, {formData.codigoPostal}</p>
              <p className="text-gray-600">{formData.pais}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border-2 border-turquoise/20 p-6 mb-8">
          <h3 className="text-xl font-bold text-dark mb-4">Total Pagado</h3>
          <p className="text-4xl font-bold text-turquoise">${total.toFixed(2)}</p>
          <p className="text-sm text-gray-600 mt-2">Método: {paymentLabels[payment]}</p>
        </div>

        <div className="flex gap-4">
          <button onClick={() => navigate('/')} className="flex-1 px-6 py-4 bg-turquoise text-white font-bold rounded-lg">
            Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  )
}