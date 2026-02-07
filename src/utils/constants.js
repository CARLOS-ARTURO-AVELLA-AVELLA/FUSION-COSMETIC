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
  {
    id: 1,
    title: 'Perfumes para Ella',
    emoji: '👰',
    href: '/productos?genero=mujer',
    description: 'Fragancias sofisticadas y femeninas'
  },
  {
    id: 2,
    title: 'Perfumes para Él',
    emoji: '🤵',
    href: '/productos?genero=hombre',
    description: 'Aromas clásicos y modernos'
  },
  {
    id: 3,
    title: 'Nuestras Marcas',
    emoji: '✨',
    href: '/productos',
    description: 'Las mejores marcas internacionales'
  },
  {
    id: 4,
    title: 'Colecciones Limitadas',
    emoji: '💎',
    href: '/productos',
    description: 'Ediciones exclusivas y especiales'
  }
]

// Razones por qué elegir Fusion
export const WHY_CHOOSE_US = [
  {
    icon: '✓',
    title: '100% Auténtico',
    description: 'Todos nuestros perfumes son originales certificados'
  },
  {
    icon: '🚚',
    title: 'Envío Rápido',
    description: 'Entrega en 2-3 días hábiles a todo el país'
  },
  {
    icon: '💳',
    title: 'Precios Competitivos',
    description: 'Las mejores ofertas del mercado'
  },
  {
    icon: '🎧',
    title: 'Soporte Premium',
    description: 'Equipo dedicado a tu servicio siempre disponible'
  }
]

// Métodos de pago aceptados
export const PAYMENT_METHODS = [
  { name: 'Tarjeta de Crédito', icon: '💳' },
  { name: 'Transferencia Bancaria', icon: '🏦' },
  { name: 'Efectivo', icon: '💵' },
  { name: 'PayPal', icon: '📱' }
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