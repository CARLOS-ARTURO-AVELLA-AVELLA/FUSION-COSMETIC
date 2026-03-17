import { useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, MessageCircle } from 'lucide-react'

export default function Footer() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])
  
  const year = new Date().getFullYear()
  
 
  const TikTokIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.88 2.88 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.96-.1z"/>
    </svg>
  )
  
  return (
    <footer className="bg-slate-900 text-white py-20 mt-20 border-t-4 border-cyan-400">
    <div className="max-w-7xl mx-auto px-6">
        
    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
  <div>
    <h3 className="text-2xl font-bold mb-6">
    <span className="text-cyan-400">FUSION COSMETIC</span> 
    </h3>
    <p className="text-gray-300 text-sm leading-relaxed mb-6">Las mejores marcas internacionales.</p>
    <div className="space-y-4">
    <div className="flex items-center gap-3 cursor-pointer group">
    <Phone size={18} className="text-cyan-400 flex-shrink-0 group-hover:scale-110 transition" />
    <a href="tel:+573223047472" className="text-gray-300 group-hover:text-cyan-400 transition duration-300 text-sm cursor-pointer">+57 (1) 322-3047472</a>
    </div>
    <div className="flex items-center gap-3 cursor-pointer group">
    <Mail size={18} className="text-cyan-400 flex-shrink-0 group-hover:scale-110 transition" />
    <a href="mailto:info@fusion.com" className="text-gray-300 group-hover:text-cyan-400 transition duration-300 text-sm cursor-pointer">info@fusion.com</a>
  </div>
    <div className="flex items-center gap-3 cursor-pointer group">
    <MapPin size={18} className="text-cyan-400 flex-shrink-0 group-hover:scale-110 transition" />
    <a href="https://www.google.com/maps/place/Bogot%C3%A1,+Colombia" target="_blank" rel="noopener noreferrer" className="text-gray-300 group-hover:text-cyan-400 transition duration-300 text-sm cursor-pointer">Bogotá, Colombia</a>
  </div>
  </div>
  </div>
        
  <div>
    <h4 className="font-bold text-lg mb-6 text-cyan-400">Navegación</h4>
    <ul className="space-y-3">
    <li><Link to="/" className="text-gray-300 hover:text-cyan-400 transition duration-300 text-sm">Inicio</Link></li>
    <li><Link to="/productos" className="text-gray-300 hover:text-cyan-400 transition duration-300 text-sm">Productos</Link></li>
    <li><Link to="/para-ella" className="text-gray-300 hover:text-cyan-400 transition duration-300 text-sm">Para Ella</Link></li>
    <li><Link to="/para-el" className="text-gray-300 hover:text-cyan-400 transition duration-300 text-sm">Para Él</Link></li>
    <li><Link to="/carrito" className="text-gray-300 hover:text-cyan-400 transition duration-300 text-sm">Carrito</Link></li>
    </ul>
  </div>
        
  <div>
    <h4 className="font-bold text-lg mb-6 text-cyan-400">Legal</h4>
    <ul className="space-y-3">
    <li><Link to="/legal#terminos" className="text-gray-300 hover:text-cyan-400 transition duration-300 text-sm">Términos de Servicio</Link></li>
    <li><Link to="/legal#privacidad" className="text-gray-300 hover:text-cyan-400 transition duration-300 text-sm">Política de Privacidad</Link></li>
    <li><Link to="/legal#envios" className="text-gray-300 hover:text-cyan-400 transition duration-300 text-sm">Política de Envíos</Link></li>
    <li><Link to="/legal#devoluciones" className="text-gray-300 hover:text-cyan-400 transition duration-300 text-sm">Cambios y Devoluciones</Link></li>
    </ul>
  </div>

  <div>
    <h4 className="font-bold text-lg mb-6 text-cyan-400">Newsletter</h4>
    <p className="text-gray-300 text-sm mb-4">Suscríbete para ofertas exclusivas</p>
    <input 
      type="email" 
      placeholder="Tu correo" 
      className="w-full px-4 py-2 rounded bg-slate-800 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 mb-2"
  />
    <button className="w-full px-4 py-2 bg-cyan-400 text-slate-900 font-bold rounded hover:bg-cyan-300 transition duration-300 text-sm">
      Suscribir
    </button>
  </div>
  </div>

    
    <div className="border-t border-slate-700 py-12 mb-8">
    <div className="flex justify-center gap-12">
    <a href="https://www.facebook.com/fusioncosmeticco" target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-full transition duration-300 transform hover:scale-110" title="Facebook">
    <Facebook size={40} />
    </a>
    <a href="https://www.instagram.com/fusioncosmeticco" target="_blank" rel="noopener noreferrer" className="bg-pink-500 hover:bg-pink-400 text-white p-4 rounded-full transition duration-300 transform hover:scale-110" title="Instagram">
    <Instagram size={40} />
    </a>
    <a href="https://twitter.com/fusioncosmeticco" target="_blank" rel="noopener noreferrer" className="bg-sky-500 hover:bg-sky-400 text-white p-4 rounded-full transition duration-300 transform hover:scale-110" title="Twitter">
    <Twitter size={40} />
    </a>
    <a href="https://wa.me/573223047472" target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-400 text-white p-4 rounded-full transition duration-300 transform hover:scale-110" title="WhatsApp">
    <MessageCircle size={40} />
    </a>
    <a href="https://www.tiktok.com/@fusioncosmeticco" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white p-4 rounded-full transition duration-300 transform hover:scale-110" title="TikTok">
    <TikTokIcon />
    </a>
  </div>
  </div>

    <div className="border-t border-slate-700 pt-8 text-center">
    <p className="text-sm text-gray-400">&copy; {year} Fusion Cosmetic. Todos los derechos reservados.</p>
  </div>
  </div>
  </footer>
  )
}