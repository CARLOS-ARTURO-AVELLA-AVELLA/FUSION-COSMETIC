  import { useNavigate } from 'react-router-dom'
import Hero from '../components/home/Hero'
import Newsletter from '../components/common/Newsletter'
import ProductCard from '../components/products/ProductCard'
import { useProductStore } from '../store/productStore'
import { useCartStore } from '../store/cartStore'
import { CATEGORIES, WHY_CHOOSE_US } from '../utils/constants'

export default function Home() {
  const navigate = useNavigate()
  const products = useProductStore((state) => state.products)
  const addItem = useCartStore((state) => state.addItem)
  const featuredProducts = products.slice(0, 6)

  const handleExploreClick = () => {
    navigate('/productos')
  }

  const handleCategoryClick = (href) => {
    navigate(href)
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <Hero />

      {/* Categorías Section */}
      <section className="py-20 bg-light-bg">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold font-display text-center mb-16 text-dark">
            Explora Nuestras Categorías
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.href)}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 h-64 flex flex-col items-center justify-center p-6 text-center">
                  <span className="text-6xl mb-4 group-hover:scale-125 transition-transform">
                    {category.emoji}
                  </span>
                  <h3 className="font-bold text-lg text-dark mb-2 font-display">
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {category.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold font-display text-dark mb-2">
                Destacados de la Temporada
              </h2>
              <p className="text-gray-600">
                Los mejores perfumes seleccionados para ti
              </p>
            </div>
            <button
              onClick={handleExploreClick}
              className="px-6 py-3 bg-gold text-dark font-bold rounded hover:bg-yellow-500 transition"
            >
              Ver Todos →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((producto) => (
              <ProductCard
                key={producto.id}
                producto={producto}
                onAddToCart={addItem}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Brands Showcase */}
      <section className="py-20 bg-light-bg">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold font-display text-center mb-16 text-dark">
            Nuestras Marcas Premium
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {['👔', '✨', '👑', '🌹', '💎', '🌸'].map((emoji, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center p-8 bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer"
              >
                <span className="text-5xl">{emoji}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold font-display text-center mb-16 text-dark">
            Por Qué Elegir FUSION
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {WHY_CHOOSE_US.map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-xl text-dark mb-2 font-display">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  )
}