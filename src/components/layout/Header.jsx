import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, Search, ShoppingCart, Heart } from 'lucide-react'
import { useCartStore } from '../../store/cartStore'
import { useWishlistStore } from '../../store/wishlistStore'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const cartItems = useCartStore((state) => state.items)
  const wishlistItems = useWishlistStore((state) => state.wishlistItems)

  return (
  <header className="sticky top-0 z-50 bg-white shadow-md">
  <div className="w-full px-6">
  <div className="flex items-center justify-between py-4 gap-8">
          
<Link to="/" className="flex-shrink-0">
  <img 
  src="/images/logofusion.jpg" 
  alt="Fusion Cosmetic Logo"
 className="h-28 w-auto"
  />
  </Link>

  <nav className="hidden lg:flex gap-10 justify-center flex-1">
    <Link 
    to="/para-ella" 
     className="text-lg font-semibold text-gray-700 hover:text-turquoise transition pb-2 border-b-2 border-transparent hover:border-turquoise whitespace-nowrap"
  >
    Para Ella
  </Link>

  <Link 
    to="/para-el" 
     className="text-lg font-semibold text-gray-700 hover:text-gold transition pb-2 border-b-2 border-transparent hover:border-gold whitespace-nowrap"
  >
    Para Él
  </Link><Link 
    to="/productos"
     className="text-lg font-semibold text-gray-700 hover:text-turquoise transition pb-2 border-b-2 border-transparent hover:border-turquoise whitespace-nowrap"
  >
    Todos los Productos
  </Link>

  <Link 
    to="/marcas" 
     className="text-lg font-semibold text-gray-700 hover:text-gold transition pb-2 border-b-2 border-transparent hover:border-gold whitespace-nowrap"
  >
    Marcas
  </Link>

  <Link 
    to="/ofertas"
     className="text-lg font-semibold text-gray-700 hover:text-turquoise transition pb-2 border-b-2 border-transparent hover:border-turquoise whitespace-nowrap"
  >
    Ofertas
  </Link>
  </nav>

  <div className="flex items-center gap-6 flex-shrink-0">
  <button 
    onClick={() => navigate('/buscar')}
     className="p-3 hover:bg-turquoise hover:text-white rounded-lg transition duration-300 hidden sm:flex items-center justify-center group"
  >
  <Search size={32} className="text-turquoise group-hover:text-white transition duration-300" />
  </button>

  <button 
    onClick={() => navigate('/wishlist')}
    className="relative p-3 hover:bg-red-50 rounded-lg transition duration-300 group"
  >
  <Heart size={32} className="text-red-500 group-hover:fill-red-500 transition duration-300" />
    {wishlistItems.length > 0 && (
  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
    {wishlistItems.length}
  </span>
)}
  </button>

  <Link to="/carrito" className="relative p-3 hover:bg-gold hover:text-white rounded-lg group transition duration-300">
  <ShoppingCart size={32} className="text-turquoise group-hover:text-white transition duration-300" />
    {cartItems.length > 0 && (
  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
    {cartItems.length}
  </span>
)}
  </Link>

  <button 
    className="lg:hidden p-3 hover:bg-light-bg rounded-lg transition" 
    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
  >
    {mobileMenuOpen ? <X size={32} className="text-turquoise" /> : <Menu size={32} className="text-turquoise" />}
  </button>
  </div>
  </div>
       
    {mobileMenuOpen && (
  <nav className="lg:hidden border-t border-gray-200 py-4 space-y-3 pb-4">
  <Link 
    to="/para-ella" 
     className="block text-dark hover:text-turquoise transition font-semibold py-2" 
    onClick={() => setMobileMenuOpen(false)}
  >
    Para Ella
  </Link>
  <Link 
    to="/para-el" 
     className="block text-dark hover:text-turquoise transition font-semibold py-2" 
    onClick={() => setMobileMenuOpen(false)}
  >
    Para Él
  </Link>
  <Link 
    to="/productos" 
     className="block text-dark hover:text-turquoise transition font-semibold py-2" 
    onClick={() => setMobileMenuOpen(false)}
  >
    Todos los Productos
  </Link>
  <Link 
    to="/marcas" 
     className="block text-dark hover:text-turquoise transition font-semibold py-2" 
    onClick={() => setMobileMenuOpen(false)}
  >
    Marcas
  </Link>
  <Link 
    to="/ofertas" 
     className="block text-dark hover:text-turquoise transition font-semibold py-2" 
    onClick={() => setMobileMenuOpen(false)}
  >
    Ofertas
  </Link>
  </nav>
)}
    </div>
  </header>
)
}