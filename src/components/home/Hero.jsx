import { useNavigate } from 'react-router-dom'

export default function Hero() {
  const navigate = useNavigate()
  
  return (
    <section className="relative w-full h-screen overflow-hidden">
  
  <div
    className="absolute inset-0 bg-cover bg-right"
    style={{
    backgroundImage: 'url("/images/COLORSM.png")',
 }}
  />
      
  <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />
     
  <div className="relative z-10 h-full flex items-center justify-start px-8 md:px-16">
  <div className="max-w-xl">
   <h1 className="text-6xl md:text-5xl font-bold font-display text-dark leading-tight mb-8">
        Evoca Tu Imagen..!
   </h1>
  <button 
    onClick={() => navigate('/productos')} 
     className="px-10 py-3 bg-turquoise text-white font-bold text-lg rounded hover:bg-gold hover:text-dark transition duration-300"
  >
    Descubre
          </button>
        </div>
      </div>
    </section>
  )
}