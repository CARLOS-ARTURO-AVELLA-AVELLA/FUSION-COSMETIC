import { useState } from 'react'
import { validateEmail } from '../../utils/helpers'
import { MESSAGES } from '../../utils/constants'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    // Validar email
    if (!email.trim()) {
      setError('Por favor ingresa un email')
      return
    }

    if (!validateEmail(email)) {
      setError('Por favor ingresa un email válido')
      return
    }

    // Aquí se guardaría en base de datos
    // Por ahora solo simular
    setSubmitted(true)
    setEmail('')

    // Limpiar estado después de 3 segundos
    setTimeout(() => {
      setSubmitted(false)
    }, 3000)
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-gold to-yellow-500">
      <div className="max-w-4xl mx-auto px-4">
        {/* Contenido */}
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">
            Suscríbete a Nuestras Ofertas
          </h2>
          <p className="text-lg md:text-xl text-dark mb-2 font-semibold">
            Obtén 10% de descuento en tu primer pedido
          </p>
          <p className="text-dark opacity-80 mb-8">
            Recibe ofertas exclusivas, recomendaciones personalizadas y acceso anticipado a nuevas colecciones.
          </p>

          {/* Mensaje de éxito */}
          {submitted && (
            <div className="p-4 bg-green-500 text-white rounded-lg mb-6 animate-fade-in">
              <p className="font-bold">{MESSAGES.success.subscribe}</p>
              <p className="text-sm mt-1">Revisa tu email para obtener tu código de descuento.</p>
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2 mb-4">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg text-dark placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-dark"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-dark text-white font-bold rounded-lg hover:bg-gray-800 transition transform hover:scale-105 active:scale-95"
              >
                Suscribirse
              </button>
            </div>

            {/* Mensaje de error */}
            {error && (
              <p className="text-red-600 text-sm font-bold mb-4 animate-fade-in">
                ✗ {error}
              </p>
            )}

            {/* Disclaimer */}
            <p className="text-xs text-dark opacity-70">
              Al suscribirse, acepta recibir comunicaciones de marketing.
              <br />
              Puedes desuscribirse en cualquier momento.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}