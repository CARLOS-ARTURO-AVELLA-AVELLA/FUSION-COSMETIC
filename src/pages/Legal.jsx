import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export default function Legal() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  const sections = [
    {
      id: 'terminos',
      title: 'Términos de Servicio',
      icon: '📋',
      content: 'En Fusion Cosmetic nos comprometemos a ofrecerte los mejores productos de fragancias internacionales con la máxima calidad y transparencia.'
    },
    {
      id: 'privacidad',
      title: 'Política de Privacidad',
      icon: '🔒',
      content: 'Tu privacidad es importante para nosotros. Protegemos tus datos personales conforme a las leyes aplicables de protección de datos.'
    },
    {
      id: 'envios',
      title: 'Política de Envíos',
      icon: '📦',
      content: 'Realizamos envíos a todo el territorio colombiano. Nuestros pedidos se procesan en 24 horas hábiles y el tiempo de entrega varía según la ubicación.'
    },
    {
      id: 'devoluciones',
      title: 'Cambios y Devoluciones',
      icon: '↩️',
      content: 'Si no estás satisfecho con tu compra, tienes 30 días para solicitar un cambio o devolución sin costo adicional.'
    }
  ]

  const handleNavClick = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-white">
     
    <section className="bg-gradient-to-r from-turquoise to-gold py-16">
    <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold font-display text-white mb-4">Información Legal</h1>
          <p className="text-white/90 text-lg">Términos, políticas y condiciones de Fusion Cosmetic</p>
    </div>
    </section>

    <div className="max-w-7xl mx-auto px-4 py-12">
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      
    <div className="lg:col-span-1">
    <div className="sticky top-24 bg-gradient-to-b from-turquoise/10 to-gold/10 rounded-xl p-6 border-2 border-turquoise/20">
        <h3 className="font-bold text-dark mb-6 text-lg">Secciones</h3>
        <nav className="space-y-3">
        {sections.map((section) => (
        <button
        key={section.id}
        onClick={() => handleNavClick(section.id)}
         className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-turquoise/20 transition text-left group"
    >
        <span className="text-xl">{section.icon}</span>
        <span className="text-dark font-semibold group-hover:text-turquoise transition text-sm">
        {section.title}
        </span>
        <ChevronRight size={16} className="ml-auto text-turquoise opacity-0 group-hover:opacity-100 transition" />
        </button>
))}
    </nav>
    </div>
    </div>

    <div className="lg:col-span-3 space-y-12">
        {sections.map((section, index) => (
    <div
        key={section.id}
        id={section.id}
         className="bg-white rounded-xl border-2 border-turquoise/20 p-8 hover:shadow-lg transition scroll-mt-24"
    >
    <div className="flex items-start gap-4 mb-6">
    <div className="text-4xl">{section.icon}</div>
    <div>
    <div className="flex items-center gap-2">
        <h2 className="text-3xl font-bold text-dark">{section.title}</h2>
        <span className="bg-turquoise text-white px-3 py-1 rounded-full text-sm font-bold">
        {index + 1}/{sections.length}
        </span>
    </div>
    </div>
    </div>
              
        {section.id === 'terminos' && (
        <div className="space-y-4 text-gray-700">
        <p className="leading-relaxed">
        {section.content}
        </p>
        <h4 className="font-bold text-dark mt-6 mb-3">1. Aceptación de Términos</h4>
        <p className="leading-relaxed">
        Al utilizar nuestro sitio web y realizar compras, aceptas estos términos de servicio. Si no estás de acuerdo con alguna parte, por favor no utilices nuestros servicios.
        </p>
        <h4 className="font-bold text-dark mt-6 mb-3">2. Uso del Sitio</h4>
        <p className="leading-relaxed">
        Nuestro sitio es para uso personal y no comercial. No debes reproducir, distribuir o transmitir contenido sin autorización.
        </p>
        <h4 className="font-bold text-dark mt-6 mb-3">3. Productos y Precios</h4>
        <p className="leading-relaxed">
        Los precios y disponibilidad de productos están sujetos a cambios. Nos reservamos el derecho de rechazar cualquier pedido.
        </p>
    </div>
)}

        {section.id === 'privacidad' && (
        <div className="space-y-4 text-gray-700">
        <p className="leading-relaxed">
        {section.content}
        </p>
        <h4 className="font-bold text-dark mt-6 mb-3">1. Información que Recolectamos</h4>
        <p className="leading-relaxed">
        Recolectamos información personal como nombre, email, dirección y datos de pago cuando realizas una compra o te registras.
        </p>
        <h4 className="font-bold text-dark mt-6 mb-3">2. Uso de tu Información</h4>
        <p className="leading-relaxed">
        Usamos tu información para procesar pedidos, mejorar nuestros servicios y enviarte comunicaciones sobre ofertas.
        </p>
        <h4 className="font-bold text-dark mt-6 mb-3">3. Protección de Datos</h4>
        <p className="leading-relaxed">
        Implementamos medidas de seguridad para properer tu información personal contra acceso no autorizado.
        </p>
    </div>
)}

        {section.id === 'envios' && (
        <div className="space-y-4 text-gray-700">
        <p className="leading-relaxed">
        {section.content}
        </p>
        <h4 className="font-bold text-dark mt-6 mb-3">1. Cobertura de Envíos</h4>
        <p className="leading-relaxed">
        Entregamos en toda Colombia a través de nuestros aliados logísticos. El envío es GRATIS en compras superiores a $150,000.
        </p>
        <h4 className="font-bold text-dark mt-6 mb-3">2. Tiempo de Entrega</h4>
        <p className="leading-relaxed">
        Los pedidos se procesan en 24 horas hábiles. El tiempo de entrega es de 3-5 días hábiles según tu ubicación.
        </p>
        <h4 className="font-bold text-dark mt-6 mb-3">3. Rastreo</h4>
        <p className="leading-relaxed">
        Recibirás un número de rastreo por email para que puedas seguir tu pedido en tiempo real.
        </p>
    </div>
)}

        {section.id === 'devoluciones' && (
        <div className="space-y-4 text-gray-700">
        <p className="leading-relaxed">
        {section.content}
        </p>
        <h4 className="font-bold text-dark mt-6 mb-3">1. Período de Devolución</h4>
        <p className="leading-relaxed">
        Tienes 30 días calendario desde la entrega para solicitar un cambio o devolución sin costo adicional.
        </p>
        <h4 className="font-bold text-dark mt-6 mb-3">2. Condiciones para Devolución</h4>
        <p className="leading-relaxed">
        El producto debe estar en su estado original, sin abrir y con el empaque intacto.
        </p>
        <h4 className="font-bold text-dark mt-6 mb-3">3. Proceso de Devolución</h4>
        <p className="leading-relaxed">
        Contacta a nuestro equipo por WhatsApp (+57 322 3047472) para iniciar el proceso de devolución.
        </p>
    </div>
)}

        <div className="mt-8 pt-6 border-t-2 border-gray-200">
        <p className="text-sm text-gray-500">
        Última actualización: {new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
    </div>
    </div>
))}
    </div>
    </div>
    </div>

    <section className="py-16 bg-gradient-to-b from-turquoise/10 to-gold/10 mt-12">
    <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-dark mb-4">¿Tienes más dudas?</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
        Nuestro equipo está disponible 24/7 para ayudarte. Contáctanos por WhatsApp o email.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
        href="https://wa.me/573223047472"
        target="_blank"
        rel="noopener noreferrer"
         className="px-8 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition"
    >
        Contactar por WhatsApp
        </a>
        <a
        href="mailto:info@fusion.com"
         className="px-8 py-3 bg-turquoise text-white font-bold rounded-lg hover:bg-teal-600 transition"
    >
        Enviar Email
        </a>
    </div>
    </div>
    </section>
    </div>
  )
}