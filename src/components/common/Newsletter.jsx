import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [productImages, setProductImages] = useState([])
  const [selectedImages, setSelectedImages] = useState([])
  const [allImages, setAllImages] = useState([])

  useEffect(() => {
    const imageNames = [
      'DOLCEGABBANA.jpg',
      'AMATYSTE.jpg',
      'CKSHOCK.avif',
      'versace.webp',
      'ORIENTICA.png',
      'bella.jpg',
      'BLUECHANEL.jpg',
      'CHS.png',
      'bossextreme.jpg',
      'JEANPASCAL.png',
      'ACQUADGIOLA.png',
      'YVESSAINTLAURENT.png',
      'L1212ROSE.png',
      'HBOSS.png',
      'PARISHILTON.jpg',
      'LATTAFA.png',
      'KENZO.png',
      'PUREXS.png',
      'LADYMILLON.jpg',

      
    ]

    const images = imageNames.map((name, index) => {
    const cleanName = name.replace(/\.[^/.]+$/, '')
    return {
    url: `/images/${name}`,
    title: cleanName,
    id: `img-${index}`,
  }
})
    setAllImages(images)
    setSelectedImages(images.map(img => img.id))
    setProductImages(images)
  }, [])

  useEffect(() => {
    const filtered = allImages.filter(img => selectedImages.includes(img.id))
    setProductImages(filtered)
    if (currentImageIndex >= filtered.length && filtered.length > 0) {
      setCurrentImageIndex(0)
    }
  }, [selectedImages, allImages, currentImageIndex])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email && email.includes('@')) {
      setSubmitted(true)
      setEmail('')
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? productImages.length - 1 : prevIndex - 1
    )
  }

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === productImages.length - 1 ? 0 : prevIndex + 1
    )
  }

  const goToImage = (index) => {
    setCurrentImageIndex(index)
  }

  return (
  <section className="py-20 bg-gradient-to-b from-white to-gray-50">
    <div className="max-w-7xl mx-auto px-4">
    <div className="text-center mb-16">
    <h2 className="text-5xl md:text-6xl font-bold font-display text-dark mb-4">
    Suscríbete a Nuestras Ofertas<span className="text-turquoise"></span>
    </h2>
      <p className="text-xl text-gray-600 mb-2">Obtén 10% de descuento en tu primer pedido</p>
      <p className="text-gray-500 max-w-2xl mx-auto">
      Sé el primero en enterarte de nuestras colecciones exclusivas de perfumes y promociones especiales.
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        
        
    <div className="lg:col-span-2">
    <div className="relative bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl overflow-hidden shadow-2xl">
           
     {productImages.length > 0 && (
      <div className="relative w-full bg-white" style={{ aspectRatio: '4/3' }}>
      <img 
      src={productImages[currentImageIndex].url}
      alt={productImages[currentImageIndex].title}
       className="w-full h-full object-contain transition-opacity duration-500"
      onError={(e) => {
      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23f0f0f0" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="16" fill="%23999"%3EImagen no encontrada%3C/text%3E%3C/svg%3E'
}}
    />

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-8">
      <p className="text-white font-bold text-2xl">
      {productImages[currentImageIndex].title}
      </p>
    </div>
    </div>
    )}

    {productImages.length === 0 && (
    <div className="w-full h-96 flex items-center justify-center bg-gray-300">
    <p className="text-gray-600 text-center">Selecciona imágenes para mostrar</p>
    </div>
    )}

    {productImages.length > 1 && (
    <>
    <button
    onClick={goToPrevious}
     className="absolute left-6 top-1/2 -translate-y-1/2 bg-turquoise hover:bg-gold text-white hover:text-dark rounded-full p-3 transition duration-300 shadow-lg hover:shadow-xl z-10"
      aria-label="Imagen anterior"
    >
    <ChevronLeft size={28} />
    </button>

    <button
      onClick={goToNext}
       className="absolute right-6 top-1/2 -translate-y-1/2 bg-turquoise hover:bg-gold text-white hover:text-dark rounded-full p-3 transition duration-300 shadow-lg hover:shadow-xl z-10"
      aria-label="Siguiente imagen"
    >
      <ChevronRight size={28} />
     </button>
    </>
    )}
    </div>
            
    {productImages.length > 1 && (
    <div className="flex justify-center gap-2 mt-8 flex-wrap">
    {productImages.map((_, index) => (
    <button
    key={index}
    onClick={() => goToImage(index)}
    className={`rounded-full transition duration-300 ${
    index === currentImageIndex 
    ? 'bg-turquoise w-8 h-3' 
    : 'bg-gray-300 w-3 h-3 hover:bg-gray-400'
  }`}
    aria-label={`Ir a imagen ${index + 1}`}
    />
   ))}
  </div>
    )}
            
  {productImages.length > 1 && (
    <div className="mt-6 flex gap-3 overflow-x-auto pb-2">
    {productImages.map((image, index) => (
    <img 
      key={image.id}
      src={image.url}
      alt={image.title}
      onClick={() => goToImage(index)}
     className={`h-20 w-20 object-cover rounded-lg cursor-pointer transition duration-300 flex-shrink-0 ${
      index === currentImageIndex 
      ? 'ring-3 ring-turquoise shadow-lg' 
     : 'opacity-60 hover:opacity-100'
      }`}
    />
    ))}
    </div>
    )}
  </div>

    <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-turquoise/10">
           
    {allImages.length > 0 && (
    <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6 mb-8">
    <p className="text-purple-700 font-semibold mb-4 text-sm">
    Selecciona imágenes ({selectedImages.length}/{allImages.length})
    </p>
      <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
    {allImages.map((img) => (
    <label key={img.id} className="flex items-center gap-2 cursor-pointer p-2 hover:bg-purple-100 rounded-lg transition">
      <input 
      type="checkbox"
    checked={selectedImages.includes(img.id)}
    onChange={(e) => {
    if (e.target.checked) {
    setSelectedImages([...selectedImages, img.id])
    } else {
    setSelectedImages(selectedImages.filter(id => id !== img.id))
      }
    }}
    className="w-4 h-4 cursor-pointer accent-purple-600"
    />
    <span className="text-xs text-gray-700 truncate font-medium">
   {img.title}
    </span>
      </label>
))}
    </div>
  </div>
  )}

 {submitted && (
  <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-lg">
   <p className="text-green-700 font-bold">
     ✓ ¡Gracias por suscribirte!
    </p>
    <p className="text-xs text-green-600 mt-1">
    Revisa tu email para recibir tu código de descuento.
    </p>
  </div>
  )}

  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
    <input
    type="email"
    placeholder="Tu correo electrónico"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
     className="px-5 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-turquoise transition text-base"
    required
    />
  <button
  type="submit"
   className="px-8 py-3 bg-gradient-to-r from-turquoise to-teal-600 text-white font-bold rounded-lg hover:shadow-lg transition duration-300 text-base"
  >
    Suscribirse Ahora
  </button>
  </form>

    <p className="text-xs text-gray-500 mt-6 text-center leading-relaxed">
    No compartimos tu email. Puedes darte de baja en cualquier momento.
      </p>
     </div>
    </div>
  </div>
  </section>
)
}