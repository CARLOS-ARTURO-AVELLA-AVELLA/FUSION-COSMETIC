import { Link } from 'react-router-dom'
import { AlertCircle, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark to-gray-800 flex items-center justify-center px-4">
    <div className="max-w-md text-center">
    <AlertCircle size={80} className="mx-auto text-gold mb-8" />
    <h1 className="text-9xl font-bold font-display text-gold mb-2">404</h1>
    <h2 className="text-4xl font-bold font-display text-white mb-4">Página No Encontrada</h2>
    <p className="text-lg text-gray-300 mb-8">La página que buscas no existe</p>
    <Link 
    to="/" 
     className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-dark font-bold rounded hover:bg-yellow-500 transition"
    >
    <Home size={20} /> Volver al Inicio
        </Link>
      </div>
    </div>
  )
}