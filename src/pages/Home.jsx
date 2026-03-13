import { useNavigate } from 'react-router-dom'
import Hero from '../components/home/Hero'
import CategoriesSection from '../components/home/CategoriesSection'
import Newsletter from '../components/common/Newsletter'
import ProductCard from '../components/products/ProductCard'
import { useProductStore } from '../store/productStore'

export default function Home() {
  const navigate = useNavigate()
  const products = useProductStore((state) => state.products)
  
  // 👇 DESTACADOS: 3 de mujer + 3 de hombre
  const womenProducts = products.filter(p => p.genero === 'mujer').slice(0, 3)
  const menProducts = products.filter(p => p.genero === 'hombre').slice(0, 3)
  const featuredProducts = [...womenProducts, ...menProducts]

  // 👇 DATOS CON IMÁGENES REALES
  const whyChooseUs = [
    {
      id: 1,
      title: 'Fragancias Originales',
      description: 'Todos nuestros perfumes son garantizados 100% auténticos y de distribuidores oficiales.',
      image: '/images/CALVIN.jpg',
    },
    {
      id: 2,
      title: 'Envío Rápido',
      description: 'Entregas a todo el país. Rastreo en tiempo real de tu pedido desde que sale de nuestro almacén.',
      image: '/images/ENTREGA.jpg',
    },
    {
      id: 3,
      title: 'Precios Competitivos',
      description: 'Las mejores ofertas con descuentos y promociones exclusivas para clientes frecuentes.',
      image: '/images/DESCUENTO.gif',
    },
    {
      id: 4,
      title: 'Soporte Premium',
      description: 'Experiencia de 35 años y atención personalizada 24/7 por WhatsApp y teléfono.',
      image: '/images/Manwhatsapp.jpg',
    },
  ]

  return (
    <div className="bg-white">
      {/* HERO */}
      <Hero />

      {/* CATEGORÍAS POR FAMILIAS OLFATIVAS */}
      <CategoriesSection />

      {/* DESTACADOS - 3 MUJER + 3 HOMBRE */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold font-display text-center mb-12 text-dark">Destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">    
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} producto={product} />
            ))}
          </div>
          <div className="text-center mt-8">
            <button 
              onClick={() => navigate('/productos')} 
              className="px-8 py-3 bg-turquoise text-white font-bold rounded hover:bg-gold hover:text-dark transition"
            >
              Ver Todos los Productos
            </button>
          </div>
        </div>
      </section>

      {/* POR QUÉ ELEGIR FUSION - CON IMÁGENES REALES */}
      <section className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold font-display text-slate-900 mb-6">
              <span className="text-turquoise">Por Qué Elegir Fusion Cosmetic</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Somos la mejor opción desde hace 35 años de clientes que buscan fragancias auténticas con garantía de calidad
            </p>
          </div>

          {/* Cards Grid con Imágenes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item) => (
              <div 
                key={item.id} 
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 h-96"
              >
                {/* Imagen de Fondo */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />

                {/* Overlay con Gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-100 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Borde Superior Turquesa */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-turquoise"></div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <p className="text-gray-600 text-lg mb-8">¿Listo para encontrar tu fragancia perfecta?</p>
            <button 
              onClick={() => navigate('/productos')} 
              className="px-8 py-4 bg-gradient-to-r from-turquoise to-gold text-white font-bold rounded-full hover:shadow-lg transition duration-300 text-lg"
            >
              Explorar Fragancias
            </button>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <Newsletter />
    </div>
  )
}