import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, Search, ShoppingCart, Heart } from 'lucide-react'
import { useCartStore } from '../../store/cartStore'
import { useWishlistStore } from '../../store/WishlistStore'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const cartItems = useCartStore((state) => state.items)
  const wishlistItems = useWishlistStore((state) => state.wishlistItems)

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="w-full px-3 sm:px-6 overflow-x-hidden">
        <div className="flex items-center justify-between py-2 sm:py-4">

          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src="/images/logofusion.jpg"
              alt="Fusion Cosmetic Logo"
              className="h-10 sm:h-16 lg:h-24 w-auto"
            />
          </Link>

          {/* Nav desktop */}
          <nav className="hidden lg:flex gap-8 justify-center flex-1">
            <Link to="/para-ella" className="text-lg font-semibold text-gray-700 hover:text-turquoise transition pb-2 border-b-2 border-transparent hover:border-turquoise whitespace-nowrap">Para Ella</Link>
            <Link to="/para-el" className="text-lg font-semibold text-gray-700 hover:text-gold transition pb-2 border-b-2 border-transparent hover:border-gold whitespace-nowrap">Para Él</Link>
            <Link to="/productos" className="text-lg font-semibold text-gray-700 hover:text-turquoise transition pb-2 border-b-2 border-transparent hover:border-turquoise whitespace-nowrap">Todos los Productos</Link>
            <Link to="/marcas" className="text-lg font-semibold text-gray-700 hover:text-gold transition pb-2 border-b-2 border-transparent hover:border-gold whitespace-nowrap">Marcas</Link>
            <Link to="/ofertas" className="text-lg font-semibold text-gray-700 hover:text-turquoise transition pb-2 border-b-2 border-transparent hover:border-turquoise whitespace-nowrap">Ofertas</Link>
          </nav>

          {/* Íconos */}
          <div className="flex items-center gap-0.5 sm:gap-3 flex-shrink-0">

            {/* Búsqueda solo sm+ */}
            <button
              onClick={() => navigate('/buscar')}
              className="hidden sm:flex p-2 sm:p-3 hover:bg-turquoise rounded-lg transition duration-300 group items-center justify-center"
            >
              <Search size={22} className="text-turquoise group-hover:text-white transition duration-300" />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => navigate('/wishlist')}
              className="relative p-2 sm:p-3 hover:bg-red-50 rounded-lg transition duration-300 group"
            >
              <Heart size={20} className="text-red-500 group-hover:fill-red-500 transition duration-300 sm:hidden" />
              <Heart size={26} className="text-red-500 group-hover:fill-red-500 transition duration-300 hidden sm:block" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-red-500 text-white text-[9px] sm:text-xs flex items-center justify-center font-bold">
                  {wishlistItems.length}
                </span>
              )}
            </button>

            {/* Carrito */}
            <Link
              to="/carrito"
              className="relative p-2 sm:p-3 hover:bg-gold rounded-lg group transition duration-300"
            >
              <ShoppingCart size={20} className="text-turquoise group-hover:text-white transition duration-300 sm:hidden" />
              <ShoppingCart size={26} className="text-turquoise group-hover:text-white transition duration-300 hidden sm:block" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-red-500 text-white text-[9px] sm:text-xs flex items-center justify-center font-bold">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* Hamburguesa */}
            <button
              className="lg:hidden p-2 sm:p-3 hover:bg-light-bg rounded-lg transition"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen
                ? <X size={20} className="text-turquoise sm:hidden" />
                : <Menu size={20} className="text-turquoise sm:hidden" />
              }
              {mobileMenuOpen
                ? <X size={26} className="text-turquoise hidden sm:block" />
                : <Menu size={26} className="text-turquoise hidden sm:block" />
              }
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        {mobileMenuOpen && (
          <nav className="lg:hidden border-t border-gray-200 py-4 space-y-1 pb-4">
            <Link to="/para-ella" className="block text-dark hover:text-turquoise transition font-semibold py-2 px-2" onClick={() => setMobileMenuOpen(false)}>Para Ella</Link>
            <Link to="/para-el" className="block text-dark hover:text-turquoise transition font-semibold py-2 px-2" onClick={() => setMobileMenuOpen(false)}>Para Él</Link>
            <Link to="/productos" className="block text-dark hover:text-turquoise transition font-semibold py-2 px-2" onClick={() => setMobileMenuOpen(false)}>Todos los Productos</Link>
            <Link to="/marcas" className="block text-dark hover:text-turquoise transition font-semibold py-2 px-2" onClick={() => setMobileMenuOpen(false)}>Marcas</Link>
            <Link to="/ofertas" className="block text-dark hover:text-turquoise transition font-semibold py-2 px-2" onClick={() => setMobileMenuOpen(false)}>Ofertas</Link>
          </nav>
        )}
      </div>
    </header>
  )
}