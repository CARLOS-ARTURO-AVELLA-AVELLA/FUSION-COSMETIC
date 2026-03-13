import { create } from 'zustand'

export const useWishlistStore = create((set, get) => ({
  wishlistItems: [],

  addToWishlist: (product) =>
    set((state) => {
      if (state.wishlistItems.find((item) => item.id === product.id)) {
        return state
      }
      return {
        wishlistItems: [...state.wishlistItems, product],
      }
    }),

  removeFromWishlist: (productId) =>
    set((state) => ({
      wishlistItems: state.wishlistItems.filter((item) => item.id !== productId),
    })),

  isInWishlist: (productId) => {
    return get().wishlistItems.some((item) => item.id === productId)
  },

  clearWishlist: () => set({ wishlistItems: [] }),
}))