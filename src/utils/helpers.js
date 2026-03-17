

/**
 * @param {number} price - El precio a formatear
 * @returns {string} Precio formateado (ej: $89.99)
 */
export const formatPrice = (price) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price)
}

/**
 * Calcula el descuento aplicado
 * @param {number} originalPrice - Precio original
 * @param {number} discountPercent - Porcentaje de descuento
 * @returns {number} Precio con descuento aplicado
 */
export const calculateDiscount = (originalPrice, discountPercent) => {
  return originalPrice * (1 - discountPercent / 100)
}

/**
 * Calcula el ahorro en dinero
 * @param {number} originalPrice - Precio original
 * @param {number} discountPercent - Porcentaje de descuento
 * @returns {number} Cantidad ahorrada
 */
export const calculateSavings = (originalPrice, discountPercent) => {
  return originalPrice * (discountPercent / 100)
}

/**
 * Genera un ID único
 * @returns {string} ID único generado
 */
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9)
}

/**
 * Trunca texto a cierta longitud
 * @param {string} text - Texto a truncar
 * @param {number} length - Longitud máxima
 * @returns {string} Texto truncado con "..."
 */
export const truncateText = (text, length = 100) => {
  if (!text) return ''
  if (text.length > length) {
    return text.substring(0, length) + '...'
  }
  return text
}

/**
 * Valida email
 * @param {string} email - Email a validar
 * @returns {boolean} True si es válido, false si no
 */
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

/**
 * Convierte rating numérico a texto descriptivo
 * @param {number} rating - Rating del 1 al 5
 * @returns {string} Descripción del rating
 */
export const getRatingText = (rating) => {
  if (rating >= 4.5) return 'Excelente'
  if (rating >= 4) return 'Muy Bueno'
  if (rating >= 3) return 'Bueno'
  if (rating >= 2) return 'Regular'
  return 'Pobre'
}

/**
 * Obtiene array de booleanos para mostrar estrellas
 * @param {number} rating - Rating del 1 al 5
 * @returns {array} Array de 5 elementos (true/false para cada estrella)
 */
export const getStarArray = (rating) => {
  const floorRating = Math.floor(rating)
  return Array(5).fill(0).map((_, i) => i < floorRating)
}

/**
 * Formatea fecha legible
 * @param {string|Date} date - Fecha a formatear
 * @returns {string} Fecha formateada (ej: "15 de Febrero de 2026")
 */
export const formatDate = (date) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    locale: 'es-CO'
  }
  return new Date(date).toLocaleDateString('es-CO', options)
}

/**
 * Capitaliza la primera letra de una cadena
 * @param {string} str - Cadena a capitalizar
 * @returns {string} Cadena capitalizada
 */
export const capitalize = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Limpia espacios en blanco extra
 * @param {string} str - Cadena a limpiar
 * @returns {string} Cadena limpia
 */
export const cleanString = (str) => {
  return str.trim().replace(/\s+/g, ' ')
}

/**
 * Obtiene parámetro de URL
 * @param {string} param - Nombre del parámetro
 * @returns {string|null} Valor del parámetro o null
 */
export const getUrlParam = (param) => {
  const params = new URLSearchParams(window.location.search)
  return params.get(param)
}

/**
 * Calcula descuento total en carrito
 * @param {array} items - Items del carrito
 * @returns {number} Total de descuentos
 */
export const calculateTotalDiscount = (items) => {
  return items.reduce((total, item) => {
    const savings = item.precio * (item.descuento / 100) * item.quantity
    return total + savings
  }, 0)
}

/**
 * Calcula subtotal sin impuestos
 * @param {array} items - Items del carrito
 * @returns {number} Subtotal
 */
export const calculateSubtotal = (items) => {
  return items.reduce((total, item) => {
    const price = item.precio * (1 - item.descuento / 100)
    return total + price * item.quantity
  }, 0)
}

/**
 * Calcula impuestos (IVA 19%)
 * @param {number} subtotal - Subtotal sin impuestos
 * @returns {number} Impuestos calculados
 */
export const calculateTaxes = (subtotal) => {
  return subtotal * 0.19 // IVA 19% Colombia
}

/**
 * Calcula total con impuestos
 * @param {array} items - Items del carrito
 * @returns {number} Total con impuestos
 */
export const calculateTotal = (items) => {
  const subtotal = calculateSubtotal(items)
  const taxes = calculateTaxes(subtotal)
  return subtotal + taxes
}

/**
 * Ordena array de productos
 * @param {array} items - Items a ordenar
 * @param {string} sortType - Tipo de ordenamiento
 * @returns {array} Array ordenado
 */
export const sortArray = (items, sortType) => {
  const sorted = [...items]

  switch (sortType) {
    case 'precio-asc':
      return sorted.sort((a, b) => a.precio - b.precio)
    case 'precio-desc':
      return sorted.sort((a, b) => b.precio - a.precio)
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating)
    case 'popular':
      return sorted.sort((a, b) => b.resenas - a.resenas)
    case 'name-asc':
      return sorted.sort((a, b) => a.nombre.localeCompare(b.nombre))
    case 'name-desc':
      return sorted.sort((a, b) => b.nombre.localeCompare(a.nombre))
    default:
      return sorted
  }
}

/**
 * Verifica si un producto está en descuento
 * @param {object} product - Producto a verificar
 * @returns {boolean} True si tiene descuento
 */
export const isOnSale = (product) => {
  return product.descuento > 0
}

/**
 * Verifica si un producto está casi agotado
 * @param {object} product - Producto a verificar
 * @returns {boolean} True si stock <= 5
 */
export const isLowStock = (product) => {
  return product.stock > 0 && product.stock <= 5
}

/**
 * Verifica si un producto está agotado
 * @param {object} product - Producto a verificar
 * @returns {boolean} True si no hay stock
 */
export const isOutOfStock = (product) => {
  return product.stock === 0
}

/**
 * Debounce para búsqueda
 * @param {function} func - Función a ejecutar
 * @param {number} wait - Tiempo de espera en ms
 * @returns {function} Función debounced
 */
export const debounce = (func, wait = 500) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Scroll suave a elemento
 * @param {string} elementId - ID del elemento a scrollear
 */
export const smoothScroll = (elementId) => {
  const element = document.getElementById(elementId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

/**
 * Copia texto al portapapeles
 * @param {string} text - Texto a copiar
 * @returns {promise} Promise que se resuelve cuando se copia
 */
export const copyToClipboard = (text) => {
  return navigator.clipboard.writeText(text)
}