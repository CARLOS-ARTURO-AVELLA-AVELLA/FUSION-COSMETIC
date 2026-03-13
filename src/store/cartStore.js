import { create } from 'zustand'

export const useCartStore = create((set, get) => ({
  items: [],

  // Inicializar carrito desde localStorage
  initializeCart: () => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('fusion_cart')
      set({ items: savedCart ? JSON.parse(savedCart) : [] })
    }
  },

  // Agregar item al carrito
  addItem: (product) =>
    set((state) => {
      const existingItem = state.items.find(item => item.id === product.id)

      let newItems
      if (existingItem) {
        // Si el producto ya existe, aumenta la cantidad
        newItems = state.items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        )
      } else {
        // Si no existe, lo agrega nuevo
        newItems = [...state.items, { ...product, quantity: product.quantity || 1 }]
      }

      // Guardar en localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('fusion_cart', JSON.stringify(newItems))
      }
      return { items: newItems }
    }),

  // Eliminar item del carrito
  removeItem: (productId) =>
    set((state) => {
      const newItems = state.items.filter(item => item.id !== productId)
      if (typeof window !== 'undefined') {
        localStorage.setItem('fusion_cart', JSON.stringify(newItems))
      }
      return { items: newItems }
    }),

  // Actualizar cantidad
  updateQuantity: (productId, quantity) =>
    set((state) => {
      const newItems = state.items.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
      if (typeof window !== 'undefined') {
        localStorage.setItem('fusion_cart', JSON.stringify(newItems))
      }
      return { items: newItems }
    }),

  // Limpiar carrito completo
  clearCart: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('fusion_cart')
    }
    return set({ items: [] })
  },

  // Obtener total del carrito
  getTotal: () => {
    const state = get()
    return state.items.reduce((total, item) => {
      const price = item.precio || 0
      const discount = item.descuento || 0
      const finalPrice = price * (1 - discount / 100)
      return total + finalPrice * item.quantity
    }, 0)
  },

  // Obtener cantidad total de items
  getItemCount: () => {
    const state = get()
    return state.items.reduce((count, item) => count + item.quantity, 0)
  },
}))