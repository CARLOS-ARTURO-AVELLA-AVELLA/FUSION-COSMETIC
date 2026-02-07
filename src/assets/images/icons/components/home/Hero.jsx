import { ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Hero() {
  const navigate = useNavigate()

  const handleExplore = () => {
    navigate('/productos')
  }

  return (
    <section className="relative h-screen md:h-[600px] overflow-hidden group">
      {/* Background Image con Gradient Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform group-hover:scale-105 transition-transform duration-1000"
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(26,26,26,0.4) 0%, rgba(212,175,55,0.1) 100%), url("https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=1920&h=800&fit=crop")',
          backgroundAttachment: 'fixed',
        }}
      />

      {/* Overlay Gradiente */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent"></div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-40 h-40 rounded-full bg-gold opacity-10 blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full bg-gold opacity-5 blur-3xl"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
        <div className="max-w-4xl space-y-6 animate-fade-in">
          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold font-display leading-tight">
            <span className="text-gold block">FRAGANCIAS</span>
            <span className="text-white">PREMIUM DEL MUNDO</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 font-light tracking-wide max-w-2xl mx-auto">
            Descubre las mejores marcas internacionales de lujo
          </p>

          {/* Brand Showcase */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm md:text-base text-gray-300 font-semibold py-6">
            <span className="hover:text-gold transition cursor-pointer">Hugo Boss</span>
            <span className="text-gold">•</span>
            <span className="hover:text-gold transition cursor-pointer">Lancôme</span>
            <span className="text-gold">•</span>
            <span className="hover:text-gold transition cursor-pointer">Christian Dior</span>
            <span className="text-gold hidden sm:inline">•</span>
            <span className="hidden sm:inline hover:text-gold transition cursor-pointer">Carolina Herrera</span>
            <span className="text-gold hidden md:inline">•</span>
            <span className="hidden md:inline hover:text-gold transition cursor-pointer">Paco Rabanne</span>
            <span className="text-gold hidden lg:inline">•</span>
            <span className="hidden lg:inline hover:text-gold transition cursor-pointer">Dolce & Gabbana</span>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <button
              onClick={handleExplore}
              className="inline-flex items-center gap-2 px-8 md:px-12 py-4 md:py-4 bg-gold text-dark font-bold text-base md:text-lg rounded-sm hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl group/btn"
            >
              <span>EXPLORAR COLECCIÓN</span>
              <span className="transform group-hover/btn:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={32} className="text-gold" strokeWidth={1.5} />
        </div>
      </div>
    </section>
  )
}