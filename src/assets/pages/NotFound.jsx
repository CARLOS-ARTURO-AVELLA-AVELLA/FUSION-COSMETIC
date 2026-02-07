import { Link } from 'react-router-dom'
import { AlertCircle, Home, ShoppingBag } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark to-gray-800 flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        {/* Icon */}
        <div className="mb-8">
          <AlertCircle size={80} className="mx-auto text-gold" />
        </div>

        {/* Error Code */}
        <h1 className="text-9xl font-bold font-display text-gold mb-2">
          404
        </h1>

        {/* Message */}
        <h2 className="text-4xl font-bold font-display text-white mb-4">
          Página No Encontrada
        </h2>

        <p className="text-lg text-gray-300 mb-8">
          Parece que la página que buscas no existe o ha sido movida.
        </p>

        {/* Description */}
        <div className="bg-gray-700 bg-opacity-50 rounded-lg p-6 mb-8 text-left">
          <p className="text-sm text-gray-200">
            <span className="font-bold text-gold">Posibles razones:</span>
          </p>
          <ul className="text-sm text-gray-300 mt-3 space-y-2">
            <li>✓ La URL es incorrecta</li>
            <li>✓ La página fue eliminada</li>
            <li>✓ El enlace está roto</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 w-full py-4 bg-gold text-dark font-bold rounded-lg hover:bg-yellow-500 transition"
          >
            <Home size={20} />
            Volver al Inicio
          </Link>

          <Link
            to="/productos"
            className="flex items-center justify-center gap-2 w-full py-4 border-2 border-gold text-gold font-bold rounded-lg hover:bg-gold hover:text-dark transition"
          >
            <ShoppingBag size={20} />
            Ver Productos
          </Link>
        </div>

        {/* Footer Message */}
        <p className="text-gray-400 text-sm mt-8">
          ¿Necesitas ayuda? Contacta con{' '}
          <a href="mailto:info@fusion-cosmetic.com" className="text-gold hover:underline">
            info@fusion-cosmetic.com
          </a>
        </p>
      </div>
    </div>
  )
}