import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import { CreditCard, Banknote, ArrowLeft } from 'lucide-react'

export default function Checkout() {
  const navigate = useNavigate()
  const items = useCartStore((state) => state.items)
  
  const [step, setStep] = useState('datos') // datos, pago, confirmacion
  const [selectedPayment, setSelectedPayment] = useState(null)
  
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    calle: '',
    ciudad: '',
    codigoPostal: '',
    pais: ''
  })

  const subtotal = items.reduce((total, item) => total + (item.precio * item.quantity), 0)
  const taxes = subtotal * 0.19
  const total = subtotal + taxes

  if (items.length === 0) {
    return (
    <div className="min-h-screen bg-white flex items-center justify-center">
    <div className="text-center">
        <h2 className="text-3xl font-bold text-dark mb-4">Tu carrito está vacío</h2>
        <button
        onClick={() => navigate('/productos')}
         className="px-6 py-3 bg-turquoise text-white font-bold rounded-lg hover:bg-teal-600 transition"
    >
        Ir a Productos
        </button>
    </div>
    </div>
    )
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleContinueToPay = () => {
    const { nombre, email, telefono, calle, ciudad, codigoPostal, pais } = formData
    if (nombre && email && telefono && calle && ciudad && codigoPostal && pais) {
      setStep('pago')
    } else {
      alert('Por favor completa todos los campos')
    }
  }

  const handleConfirmPay = () => {
    if (!selectedPayment) {
      alert('Por favor selecciona un método de pago')
      return
    }
    
    const orderNumber = `ORD-${Date.now()}`
    const orderData = {
      orderNumber,
      items,
      formData,
      payment: selectedPayment,
      total,
      timestamp: new Date().toLocaleString('es-CO')
    }
    
  
    console.log('Guardando en sessionStorage:', orderData)
    sessionStorage.setItem('lastOrder', JSON.stringify(orderData))
    console.log('Guardado:', sessionStorage.getItem('lastOrder'))
    console.log('Navegando a confirmación...')
navigate('/checkout/confirmacion')
  }

  return (
    <div className="min-h-screen bg-white">
    
    <section className="bg-gradient-to-r from-turquoise to-gold py-12">
    <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold font-display text-white">Checkout</h1>
        <p className="text-white/90">Paso {step === 'datos' ? '1' : '2'} de 2</p>
    </div>
</section>

    <div className="max-w-7xl mx-auto px-4 py-12">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
    <div className="lg:col-span-2">
        {step === 'datos' && (
    <div className="bg-white rounded-xl border-2 border-turquoise/20 p-8">
        <h2 className="text-2xl font-bold text-dark mb-6">Información de Entrega</h2>
                
    <div className="space-y-6">
              
    <div>
        <label className="block text-sm font-semibold text-dark mb-2">Nombre Completo *</label>
        <input
        type="text"
        name="nombre"
        value={formData.nombre}
        onChange={handleInputChange}
        placeholder="Juan Pérez"
         className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-turquoise transition"
    />
    </div>

    <div>
        <label className="block text-sm font-semibold text-dark mb-2">Email *</label>
        <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="juan@example.com"
         className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-turquoise transition"
    />
    </div>

    <div>
        <label className="block text-sm font-semibold text-dark mb-2">Teléfono *</label>
        <input
        type="tel"
        name="telefono"
        value={formData.telefono}
        onChange={handleInputChange}
        placeholder="+57 300 1234567"
         className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-turquoise transition"
    />
    </div>

    <div>
        <label className="block text-sm font-semibold text-dark mb-2">Calle *</label>
        <input
        type="text"
        name="calle"
        value={formData.calle}
        onChange={handleInputChange}
        placeholder="Cra 5 # 45-67"
         className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-turquoise transition"
    />
    </div>

    <div>
    <label className="block text-sm font-semibold text-dark mb-2">Ciudad *</label>
    <input
        type="text"
        name="ciudad"
        value={formData.ciudad}
        onChange={handleInputChange}
        placeholder="Bogotá"
         className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-turquoise transition"
    />
    </div>

    <div>
        <label className="block text-sm font-semibold text-dark mb-2">Código Postal *</label>
        <input
        type="text"
        name="codigoPostal"
        value={formData.codigoPostal}
        onChange={handleInputChange}
        placeholder="110111"
         className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-turquoise transition"
    />
    </div>

    <div>
        <label className="block text-sm font-semibold text-dark mb-2">País *</label>
        <select
        name="pais"
        value={formData.pais}
        onChange={handleInputChange}
         className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-turquoise transition bg-white"
    >
        <option value="">Selecciona un país</option>
        <option value="Colombia">Colombia</option>
        <option value="Argentina">Argentina</option>
        <option value="Chile">Chile</option>
        <option value="México">México</option>
        <option value="Perú">Perú</option>
        <option value="Venezuela">Venezuela</option>
        <option value="Ecuador">Ecuador</option>
        <option value="Brasil">Brasil</option>
</select>
    </div>
    </div>

    <div className="flex gap-4 mt-8">
        <button
        onClick={() => navigate('/carrito')}
         className="flex items-center gap-2 px-6 py-3 border-2 border-turquoise text-turquoise font-bold rounded-lg hover:bg-turquoise/5 transition"
    >
        <ArrowLeft size={20} />
        Volver al Carrito
        </button>
        <button
        onClick={handleContinueToPay}
         className="flex-1 px-6 py-3 bg-gradient-to-r from-turquoise to-teal-600 text-white font-bold rounded-lg hover:shadow-lg transition"
    >
        Continuar al Pago →
        </button>
    </div>
    </div>
)}

        {step === 'pago' && (
    <div className="bg-white rounded-xl border-2 border-turquoise/20 p-8">
        <h2 className="text-2xl font-bold text-dark mb-6">Selecciona Método de Pago</h2>

    <div className="space-y-4">
                 
        <label className="flex items-center p-6 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-turquoise transition"
        style={{ borderColor: selectedPayment === 'tarjeta' ? '#14b8a6' : undefined }}>
        <input
        type="radio"
        name="payment"
        value="tarjeta"
        checked={selectedPayment === 'tarjeta'}
        onChange={(e) => setSelectedPayment(e.target.value)}
        
    />
        <CreditCard size={24} className="ml-4 text-turquoise" />
    <div className="ml-4 flex-1">
        <p className="font-bold text-dark">Tarjeta de Crédito/Débito</p>
        <p className="text-sm text-gray-600">Visa, MasterCard, American Express</p>
    </div>
        </label>

        <label className="flex items-center p-6 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-turquoise transition"
        style={{ borderColor: selectedPayment === 'paypal' ? '#14b8a6' :
        undefined }}>
        
        <input
        type="radio"
        name="payment"
        value="paypal"
        checked={selectedPayment === 'paypal'}
        onChange={(e) => setSelectedPayment(e.target.value)}
         className="w-4 h-4 accent-turquoise"
    />
    <div className="ml-4 text-2xl">🅿️</div>
    <div className="ml-4 flex-1">
        <p className="font-bold text-dark">PayPal</p>
        <p className="text-sm text-gray-600">Paga con tu cuenta de PayPal</p>
    </div>
        </label>

        <label className="flex items-center p-6 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-turquoise transition"
        style={{ borderColor: selectedPayment === 'transferencia' ? '#14b8a6' : undefined }}>
        <input
        type="radio"
        name="payment"
        value="transferencia"
        checked={selectedPayment === 'transferencia'}
        onChange={(e) => setSelectedPayment(e.target.value)}
        className="w-4 h-4 accent-turquoise"
    />
        <Banknote size={24} className="ml-4 text-turquoise" />
        <div className="ml-4 flex-1">
        <p className="font-bold text-dark">Transferencia Bancaria</p>
        <p className="text-sm text-gray-600">Transferencia directa a nuestra cuenta</p>
    </div>
        </label>

        <label className="flex items-center p-6 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-turquoise transition"
        style={{ borderColor: selectedPayment === 'breb' ? '#14b8a6' : undefined }}>
        <input
        type="radio"
        name="payment"
        value="breb"
        checked={selectedPayment === 'breb'}
        onChange={(e) => setSelectedPayment(e.target.value)}
         className="w-4 h-4 accent-turquoise"
    />
    <div className="ml-4 text-2xl">💳</div>
    <div className="ml-4 flex-1">
        <p className="font-bold text-dark">Bre-B</p>
        <p className="text-sm text-gray-600">Pago con Bre-B</p>
    </div>
        </label>
    </div>

    <div className="flex gap-4 mt-8">
        <button
        onClick={() => setStep('datos')}
         className="flex items-center gap-2 px-6 py-3 border-2 border-turquoise text-turquoise font-bold rounded-lg hover:bg-turquoise/5 transition"
    >
        <ArrowLeft size={20} />
        Volver
        </button>
        <button
        onClick={handleConfirmPay}
         className="flex-1 px-6 py-3 bg-gradient-to-r from-gold to-yellow-500 text-dark font-bold rounded-lg hover:shadow-lg transition text-lg"
    >
        Confirmar Pago ${total.toFixed(2)}
        </button>
    </div>
    </div>
  )}
    </div>

    <div className="lg:col-span-1">
    <div className="bg-gradient-to-b from-turquoise/10 to-gold/10 rounded-xl p-6 border-2 border-turquoise/20 sticky top-24">
      <h3 className="text-xl font-bold text-dark mb-6">Resumen de Compra</h3>

    <div className="space-y-3 mb-6 pb-6 border-b-2 border-turquoise/20 max-h-64 overflow-y-auto">
      {items.map(item => {
      const price = item.precio * (1 - item.descuento / 100)
        return (
    <div key={item.id} className="text-sm">
    <div className="flex justify-between mb-1">
      <span className="font-semibold text-dark">{item.nombre}</span>
      <span className="text-turquoise font-bold">x{item.quantity}</span>
    </div>
    <div className="flex justify-between text-gray-600">
      <span>${price.toFixed(2)}</span>
      <span>${(price * item.quantity).toFixed(2)}</span>
    </div>
    </div>
  )
})}
    </div>

    <div className="space-y-3">
    <div className="flex justify-between">
      <span className="text-gray-700">Subtotal:</span>
      <span className="font-bold">${subtotal.toFixed(2)}</span>
    </div>
    <div className="flex justify-between">
      <span className="text-gray-700">Impuestos (19%):</span>
      <span className="font-bold">${taxes.toFixed(2)}</span>
    </div>
    <div className="flex justify-between text-green-600">
      <span className="font-bold">Envío:</span>
      <span className="font-bold">GRATIS ✓</span>
    </div>
    </div>

    <div className="border-t-2 border-turquoise/20 mt-4 pt-4">
    <div className="flex justify-between items-center">
      <span className="text-dark font-bold">Total:</span>
      <span className="text-3xl font-bold text-turquoise">${total.toFixed(2)}</span>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
)
}