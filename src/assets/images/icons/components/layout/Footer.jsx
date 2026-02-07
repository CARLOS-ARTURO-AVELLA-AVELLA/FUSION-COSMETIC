import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark text-white py-16 mt-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-1 mb-4">
              <h3 className="text-xl font-bold font-display">
                <span className="text-gold">FUSION</span>
                <span> cosmetic</span>
              </h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Tu destino para fragancias premium de las mejores marcas internacionales de lujo.
            </p>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-start gap-2">
                <Phone size={16} className="mt-1 flex-shrink-0 text-gold" />
                <span>+57 (1) 555-0123</span>
              </div>
              <div className="flex items-start gap-2">
                <Mail size={16} className="mt-1 flex-shrink-0 text-gold" />
                <span>info@fusion-cosmetic.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 flex-shrink-0 text-gold" />
                <span>Bogotá, Colombia</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-gold">Categorías</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/productos?genero=mujer" className="hover:text-gold transition">
                  Perfumes para Ella
                </Link>
              </li>
              <li>
                <Link to="/productos?genero=hombre" className="hover:text-gold transition">
                  Perfumes para Él
                </Link>
              </li>
              <li>
                <Link to="/productos" className="hover:text-gold transition">
                  Todas las Colecciones
                </Link>
              </li>
              <li>
                <Link to="/productos" className="hover:text-gold transition">
                  Nuestras Marcas
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-gold">Ayuda</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/" className="hover:text-gold transition">
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-gold transition">
                  Política de Envíos
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-gold transition">
                  Términos de Servicio
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-gold transition">
                  Política de Privacidad
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-gold">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-4">
              Recibe ofertas exclusivas y novedades directo en tu email.
            </p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Tu email"
                className="px-4 py-2 rounded bg-gray-800 text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-gold"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded bg-gold text-dark font-bold text-sm hover:bg-yellow-500 transition"
              >
                Suscribirse
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 py-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            &copy; {currentYear} Fusion Cosmetic. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <a 
              href="#" 
              className="text-gray-400 hover:text-gold transition"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a 
              href="#" 
              className="text-gray-400 hover:text-gold transition"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a 
              href="#" 
              className="text-gray-400 hover:text-gold transition"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
          </div>
        </div>

        {/* Payment Methods & SSL */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>🔒 Sitio seguro con SSL | Métodos de pago: Tarjeta de crédito • Transferencia • Efectivo</p>
        </div>
      </div>
    </footer>
  )
}