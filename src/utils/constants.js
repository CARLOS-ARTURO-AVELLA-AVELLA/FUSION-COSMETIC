// ═════════════════════════════════════════════════════════════════════════
// CONSTANTES GLOBALES - FUSION COSMETIC
// ═════════════════════════════════════════════════════════════════════════

// Colores de la aplicación
export const COLORS = {
  gold: '#D4AF37',
  dark: '#1a1a1a',
  light: '#F5F5F5',
  accent: '#E91E63',
  gray600: '#666666',
  gray300: '#cccccc',
  white: '#ffffff'
}

// Marcas disponibles
export const BRANDS = [
  { id: 1, name: 'Hugo Boss', logo: '👔' },
  { id: 2, name: 'Lancôme', logo: '✨' },
  { id: 3, name: 'Christian Dior', logo: '👑' },
  { id: 4, name: 'Carolina Herrera', logo: '🌹' },
  { id: 5, name: 'Paco Rabanne', logo: '💎' },
  { id: 6, name: 'Dolce & Gabbana', logo: '🌸' }
]

// Tipos de fragancias
export const FRAGRANCE_TYPES = [
  'Floral',
  'Oriental',
  'Frutal',
  'Amaderado',
  'Fresco',
  'Especiado',
  'Verde',
  'Cítrico'
]

// Géneros
export const GENDERS = [
  { value: 'mujer', label: 'Para Ella' },
  { value: 'hombre', label: 'Para Él' },
  { value: 'unisex', label: 'Unisex' }
]

// Rangos de precio
export const PRICE_RANGES = [
  { id: 1, label: 'Todos', min: 0, max: 10000 },
  { id: 2, label: '$0 - $50', min: 0, max: 50 },
  { id: 3, label: '$50 - $100', min: 50, max: 100 },
  { id: 4, label: '$100 - $250', min: 100, max: 250 },
  { id: 5, label: '$250+', min: 250, max: 10000 }
]

// Opciones de ordenamiento
export const SORT_OPTIONS = [
  { value: 'newest', label: 'Más Nuevos' },
  { value: 'popular', label: 'Más Populares' },
  { value: 'precio-asc', label: 'Precio: Menor a Mayor' },
  { value: 'precio-desc', label: 'Precio: Mayor a Menor' },
  { value: 'rating', label: 'Mejor Calificados' }
]

// Mensajes de la aplicación
export const MESSAGES = {
  success: {
    addCart: '✓ Producto agregado al carrito',
    addWishlist: '♥ Agregado a favoritos',
    removeCart: '✓ Producto eliminado del carrito',
    subscribe: '✓ ¡Gracias por suscribirte!'
  },
  error: {
    generic: 'Algo salió mal. Intenta nuevamente.',
    network: 'Error de conexión. Intenta más tarde.',
    notFound: 'Producto no encontrado.'
  }
}

// Categorías principales
export const CATEGORIES = [
  { id: 1, title: 'Florales', emoji: '👰', href: '/productos?genero=mujer', description: '' },
  { id: 2, title: 'Cítricas', emoji: '🤵', href: '/productos?genero=hombre', description: '' },
  { id: 3, title: 'Amaderadas', emoji: '✨', href: '/productos', description: '' },
  { id: 4, title: 'Orientales-Ambaradas', emoji: '💎', href: '/productos', description: '' },
  { id: 5, title: 'Fragancias Chipré', emoji: '🌟', href: '/productos', description: '' },
  { id: 6, title: 'Fragancias Gourmand', emoji: '⭐', href: '/productos', description: '' },
  { id: 7, title: 'Fragancias Fougère', emoji: '🎁', href: '/productos', description: '' },
  { id: 8, title: 'Fragancias Especiadas', emoji: '👑', href: '/productos', description: '' },
]

// ⭐ RAZONES POR QUÉ ELEGIR FUSION
export const WHY_CHOOSE_US = [
  {
    icon: '✓',
    title: '100% Auténtico',
    description: 'Todos nuestros perfumes son originales certificados. Cada producto viene con garantía de autenticidad y puedes comprar con total confianza.',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600'
  },
  {
    icon: '🚚',
    title: 'Envío Rápido',
    description: 'Entregas a todo el país. Rastreo en tiempo real de tu pedido desde que sale de nuestro almacén.',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600'
  },
  {
    icon: '💳',
    title: 'Precios Competitivos',
    description: 'Las mejores ofertas con descuentos y promociones exclusivas para clientes frecuentes.',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600'
  },
  {
    icon: '🎧',
    title: 'Soporte Premium',
    description: 'Experiencia de 35 años y atención personalizada 24/7.',
    bgColor: 'bg-orange-50',
    iconColor: 'text-orange-600'
  }
]

// URLs de redes sociales
export const SOCIAL_MEDIA = [
  { name: 'Facebook', url: 'https://facebook.com', icon: '📘' },
  { name: 'Instagram', url: 'https://instagram.com', icon: '📷' },
  { name: 'Twitter', url: 'https://twitter.com', icon: '𝕏' }
]

// Información de contacto
export const CONTACT_INFO = {
  phone: '+57 (1) 555-0123',
  email: 'info@fusion-cosmetic.com',
  address: 'Bogotá, Colombia',
  hours: 'Lunes - Viernes: 9:00 AM - 6:00 PM'
}

// Texto legal
export const LEGAL_NOTICE = 'Al suscribirse, acepta nuestra política de privacidad y términos de servicio.'