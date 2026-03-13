import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton() {
  const whatsappNumber = '573223047472'
  const message = 'Hola! Me gustaría conocer más sobre vuestros productos de Fusion Cosmetic.'

  const handleClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-8 right-8 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-110 z-40 animate-bounce"
      title="Contactar por WhatsApp"
      aria-label="Abrir WhatsApp"
    >
      <MessageCircle size={32} />
    </button>
  )
}