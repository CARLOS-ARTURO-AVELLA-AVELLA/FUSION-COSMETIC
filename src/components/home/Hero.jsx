import { useNavigate } from 'react-router-dom'

export default function Hero() {
  const navigate = useNavigate()

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center md:bg-right"
        style={{ backgroundImage: 'url("/images/COLORSM.png")' }}
      />
      {/* ✅ Gradiente más fuerte para garantizar contraste */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />

      <div className="relative z-10 h-full flex items-center justify-start px-6 md:px-16">
        <div className="max-w-xl">
          {/* ✅ Texto blanco con sombra — legible sobre cualquier foto */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-white leading-tight mb-6 md:mb-8"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
          >
            Evoca Tu Imagen..!
          </h1>
          <button
            onClick={() => navigate('/productos')}
            className="px-8 py-3 bg-turquoise text-white font-bold text-base md:text-lg rounded hover:bg-gold hover:text-dark transition duration-300"
          >
            Descubre
          </button>
        </div>
      </div>
    </section>
  )
}