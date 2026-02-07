import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, Search, User, ShoppingCart, Heart } from 'lucide-react'
import { useCartStore } from '../../store/cartStore'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchActive, setSearchActive] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeDropdown, setActiveDropdown] = useState(null)
  const navigate = useNavigate()
  const cartItems = useCartStore((state) => state.items)

  const navMenu = [
    {
      label: 'Perfumes para Ella',
      href: '/productos?genero=mujer',
      submenu: [
        { label: 'Todos', href: '/productos?genero=mujer' },
        { label: 'Florales', href: '/productos?genero=mujer&tipo=Floral' },
        { label: 'Orientales', href: '/productos?genero=mujer&tipo=Oriental' },
        { label: 'Frutales', href: '/productos?genero=mujer&tipo=Frutal' },
      ]
    },
    {
      label: 'Perfumes para Él',
      href: '/productos?genero=hombre',
      submenu: [
        { label: 'Todos', href: '/productos?genero=hombre' },
        { label: 'Clásicos', href: '/productos?genero=hombre&tipo=Amaderado' },
        { label: 'Frescos', href: '/productos?genero=hombre&tipo=Fresco' },
        { label: 'Especiados', href: '/productos?genero=hombre&tipo=Especiado' },
      ]
    },
    {
      label: 'Nuestras Marcas',
      href: '/productos',
      submenu: [
        { label: 'Hugo Boss', href: '/productos?marca=Hugo%20Boss' },
        { label: 'Lancôme', href: '/productos?marca=Lancôme' },
        { label: 'Christian Dior', href: '/productos?marca=Christian%20Dior' },
        { label: 'Carolina Herrera', href: '/productos?marca=Carolina%20Herrera' },
        { label: 'Paco Rabanne', href: '/productos?marca=Paco%20Rabanne' },
        { label: 'Dolce & Gabbana', href: '/productos?marca=Dolce%20%26%20Gabbana' },
      ]
    },
    {
      label: 'Colecciones',
      href: '/productos',
      submenu: [
        { label: 'Nuevas', href: '/productos?new=true' },
        { label: 'En Oferta', href: '/productos?discount=true' },
        { label: 'Limitadas', href: '/productos?limited=true' },
      ]
    }
  ]

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/productos?search=${searchQuery}`)
      setSearchQuery('')
      setSearchActive(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-1 group hover:opacity-80 transition"
          >
            <span className="text-2xl font-bold font-display text-gold">FUSION</span>
            <span className="text-2xl font-bold font-display text-dark">cosmetic</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-8">
            {navMenu.map((item) => (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {/* Main Menu Item */}
                <Link
                  to={item.href}
                  className="text-sm font-semibold text-gray-700 hover:text-gold transition relative pb-2 group/link"
                >
                  {item.label}
                  {/* Animated Underline */}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover/link:w-full"></span>
                </Link>

                {/* Dropdown Menu */}
                {item.submenu && (
                  <div className="absolute top-full left-0 mt-0 w-56 bg-white border border-gray-200 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0 py-2">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.label}
                        to={subitem.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-light-bg hover:text-gold transition"
                      >
                        {subitem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            {/* Search */}
            {!searchActive ? (
              <button
                onClick={() => setSearchActive(true)}
                className="p-2 hover:bg-light-bg rounded-lg transition hidden sm:block"
                aria-label="Buscar"
              >
                <Search size={20} className="text-dark" />
              </button>
            ) : (
              <form onSubmit={handleSearch} className="flex items-center gap-2 bg-light-bg px-3 py-2 rounded-lg">
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent outline-none text-sm w-40 placeholder-gray-500"
                  autoFocus
                />
                <button type="submit" className="text-gold hover:scale-110 transition">
                  <Search size={18} />
                </button>
              </form>
            )}

            {/* User Account */}
            <button
              className="p-2 hover:bg-light-bg rounded-lg transition hidden sm:block"
              aria-label="Mi cuenta"
            >
              <User size={20} className="text-dark" />
            </button>

            {/* Wishlist */}
            <button
              className="p-2 hover:bg-light-bg rounded-lg transition"
              aria-label="Favoritos"
            >
              <Heart size={20} className="text-dark" />
            </button>

            {/* Cart */}
            <Link
              to="/carrito"
              className="relative p-2 hover:bg-light-bg rounded-lg transition group"
              aria-label="Carrito"
            >
              <ShoppingCart size={20} className="text-dark group-hover:text-gold transition" />
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 rounded-full bg-gold text-white text-xs flex items-center justify-center font-bold animate-pulse">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menú móvil"
            >
              {mobileMenuOpen ? (
                <X size={24} className="text-dark" />
              ) : (
                <Menu size={24} className="text-dark" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="lg:hidden border-t border-gray-200 py-4 space-y-3 pb-4">
            {navMenu.map((item) => (
              <div key={item.label}>
                <Link
                  to={item.href}
                  className="block w-full text-left py-2 font-semibold text-dark hover:text-gold transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
                {item.submenu && (
                  <div className="pl-4 space-y-2">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.label}
                        to={subitem.href}
                        className="block text-sm text-gray-600 hover:text-gold transition py-1"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {subitem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}