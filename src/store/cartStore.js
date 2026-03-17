import { create } from 'zustand'

export const useCartStore = create((set, get) => ({
  items: [],

 
  initializeCart: () => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('fusion_cart')
      set({ items: savedCart ? JSON.parse(savedCart) : [] })
    }
  },

 
  addItem: (product) =>
    set((state) => {
      const existingItem = state.items.find(item => item.id === product.id)

      let newItems
      if (existingItem) {
        
        newItems = state.items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        )
      } else {
      
        newItems = [...state.items, { ...product, quantity: product.quantity || 1 }]
      }

    
      if (typeof window !== 'undefined') {
        localStorage.setItem('fusion_cart', JSON.stringify(newItems))
      }
      return { items: newItems }
    }),

  
  removeItem: (productId) =>
    set((state) => {
      const newItems = state.items.filter(item => item.id !== productId)
      if (typeof window !== 'undefined') {
        localStorage.setItem('fusion_cart', JSON.stringify(newItems))
      }
      return { items: newItems }
    }),


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

  
  clearCart: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('fusion_cart')
    }
    return set({ items: [] })
  },

  
  getTotal: () => {
    const state = get()
    return state.items.reduce((total, item) => {
      const price = item.precio || 0
      const discount = item.descuento || 0
      const finalPrice = price * (1 - discount / 100)
      return total + finalPrice * item.quantity
    }, 0)
  },

 
  getItemCount: () => {
    const state = get()
    return state.items.reduce((count, item) => count + item.quantity, 0)
  },
}))