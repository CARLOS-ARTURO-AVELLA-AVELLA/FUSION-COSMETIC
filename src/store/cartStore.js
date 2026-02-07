import { create } from 'zustand'

export const useCartStore = create((set) => ({
  items: JSON.parse(localStorage.getItem('fusion_cart')) || [],
  
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
      localStorage.setItem('fusion_cart', JSON.stringify(newItems))
      return { items: newItems }
    }),

  // Eliminar item del carrito
  removeItem: (productId) =>
    set((state) => {
      const newItems = state.items.filter(item => item.id !== productId)
      localStorage.setItem('fusion_cart', JSON.stringify(newItems))
      return { items: newItems }
    }),

  // Actualizar cantidad
  updateQuantity: (productId, quantity) =>
    set((state) => {
      const newItems = state.items.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
      localStorage.setItem('fusion_cart', JSON.stringify(newItems))
      return { items: newItems }
    }),

  // Limpiar carrito completo
  clearCart: () => {
    localStorage.removeItem('fusion_cart')
    return { items: [] }
  },

  // Obtener total del carrito
  getTotal: (state) => {
    return state.items.reduce((total, item) => {
      const price = item.precio * (1 - item.descuento / 100)
      return total + price * item.quantity
    }, 0)
  },

  // Obtener cantidad total de items
  getItemCount: (state) => {
    return state.items.reduce((count, item) => count + item.quantity, 0)
  },
}))