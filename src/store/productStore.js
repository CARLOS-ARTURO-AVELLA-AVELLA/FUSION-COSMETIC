import { create } from 'zustand'

// Datos mock de productos
const mockProducts = [
  {
    id: 1,
    nombre: 'Sauvage',
    marca: 'Christian Dior',
    precio: 89.99,
    descuento: 0,
    imagen: '🌙',
    rating: 4.8,
    genero: 'hombre',
    tipo: 'Amaderado',
    volumen: 100,
    notaSalida: 'Ambroxán, Pimienta',
    notaCorazon: 'Ámbar Gris, Madera',
    notaBase: 'Cedro, Vanil',
    stock: 15,
    descripcion: 'Un perfume icónico con notas frescas y amaderadas. Perfecto para hombres que buscan elegancia y sofisticación.',
    resenas: 245
  },
  {
    id: 2,
    nombre: 'Opium',
    marca: 'Yves Saint Laurent',
    precio: 79.99,
    descuento: 10,
    imagen: '🌹',
    rating: 4.7,
    genero: 'mujer',
    tipo: 'Oriental',
    volumen: 90,
    notaSalida: 'Bergamota, Mandarina',
    notaCorazon: 'Jazmín, Flor Blanca',
    notaBase: 'Sándalo, Ámbar',
    stock: 20,
    descripcion: 'Un aroma oriental y sensual, perfecto para ocasiones especiales. Con notas cálidas y envolventes.',
    resenas: 189
  },
  {
    id: 3,
    nombre: 'Eros',
    marca: 'Versace',
    precio: 84.99,
    descuento: 0,
    imagen: '💎',
    rating: 4.9,
    genero: 'hombre',
    tipo: 'Frutal',
    volumen: 100,
    notaSalida: 'Menta, Manzana Verde',
    notaCorazon: 'Vainilla, Almízcares',
    notaBase: 'Cedro, Almizcares',
    stock: 25,
    descripcion: 'Un perfume fresco y moderno que representa la energía de la juventud. Notas frutales y especiadas.',
    resenas: 312
  },
  {
    id: 4,
    nombre: 'Bloom',
    marca: 'Gucci',
    precio: 94.99,
    descuento: 5,
    imagen: '🌸',
    rating: 4.6,
    genero: 'mujer',
    tipo: 'Floral',
    volumen: 100,
    notaSalida: 'Pimienta Rosa, Naranja',
    notaCorazon: 'Tuberrosa, Jacinto',
    notaBase: 'Pachuli, Almízcares',
    stock: 18,
    descripcion: 'Una fragancia floral y delicada con toques cítricos. Ideal para mujeres sofisticadas.',
    resenas: 156
  },
  {
    id: 5,
    nombre: 'Aventus',
    marca: 'Creed',
    precio: 249.99,
    descuento: 0,
    imagen: '👑',
    rating: 5.0,
    genero: 'hombre',
    tipo: 'Frutal',
    volumen: 120,
    notaSalida: 'Piña, Bergamota',
    notaCorazon: 'Flor Blanca',
    notaBase: 'Ámbar Gris, Madera',
    stock: 8,
    descripcion: 'Un perfume de lujo con una composición frutal y sofisticada. Perfecto para hombres de éxito.',
    resenas: 428
  },
  {
    id: 6,
    nombre: 'La Vie Est Belle',
    marca: 'Lancôme',
    precio: 74.99,
    descuento: 15,
    imagen: '✨',
    rating: 4.8,
    genero: 'mujer',
    tipo: 'Oriental',
    volumen: 75,
    notaSalida: 'Cacao, Cereales',
    notaCorazon: 'Praliné, Caramelo',
    notaBase: 'Vainilla, Ámbar',
    stock: 30,
    descripcion: 'Un aroma dulce y gourmand que celebra la belleza de la vida. Notas cálidas y reconfortantes.',
    resenas: 267
  }
]

export const useProductStore = create((set) => ({
  products: mockProducts,
  filteredProducts: mockProducts,
  loading: false,
  error: null,

  // Obtener todos los productos
  getAllProducts: () => set({ filteredProducts: mockProducts }),

  // Obtener producto por ID
  getProductById: (id) => {
    return mockProducts.find(p => p.id === parseInt(id)) || null
  },

  // Filtrar productos
  filterProducts: (filters) =>
    set((state) => {
      let filtered = [...mockProducts]

      // Filtrar por género
      if (filters.genero && filters.genero !== '') {
        filtered = filtered.filter(p => p.genero === filters.genero)
      }

      // Filtrar por marca
      if (filters.marca && filters.marca !== '') {
        filtered = filtered.filter(p => p.marca === filters.marca)
      }

      // Filtrar por tipo
      if (filters.tipo && filters.tipo !== '') {
        filtered = filtered.filter(p => p.tipo === filters.tipo)
      }

      // Filtrar por rango de precio
      if (filters.priceMin !== undefined && filters.priceMax !== undefined) {
        filtered = filtered.filter(
          p => p.precio >= filters.priceMin && p.precio <= filters.priceMax
        )
      }

      // Filtrar por búsqueda
      if (filters.search && filters.search !== '') {
        const searchLower = filters.search.toLowerCase()
        filtered = filtered.filter(
          p =>
            p.nombre.toLowerCase().includes(searchLower) ||
            p.marca.toLowerCase().includes(searchLower) ||
            p.descripcion.toLowerCase().includes(searchLower)
        )
      }

      // Filtrar nuevos productos
      if (filters.new === true) {
        filtered = filtered.slice(0, 3) // Los primeros 3 como "nuevos"
      }

      // Filtrar con descuento
      if (filters.discount === true) {
        filtered = filtered.filter(p => p.descuento > 0)
      }

      return { filteredProducts: filtered }
    }),

  // Ordenar productos
  sortProducts: (sortType) =>
    set((state) => {
      let sorted = [...state.filteredProducts]

      switch (sortType) {
        case 'precio-asc':
          sorted.sort((a, b) => a.precio - b.precio)
          break
        case 'precio-desc':
          sorted.sort((a, b) => b.precio - a.precio)
          break
        case 'rating':
          sorted.sort((a, b) => b.rating - a.rating)
          break
        case 'popular':
          sorted.sort((a, b) => b.resenas - a.resenas)
          break
        case 'newest':
          // Mantener orden original (más nuevos primero)
          sorted = [...state.filteredProducts]
          break
        default:
          break
      }

      return { filteredProducts: sorted }
    }),

  // Buscar productos
  searchProducts: (query) =>
    set((state) => {
      if (!query || query.trim() === '') {
        return { filteredProducts: mockProducts }
      }

      const searchLower = query.toLowerCase()
      const filtered = mockProducts.filter(
        p =>
          p.nombre.toLowerCase().includes(searchLower) ||
          p.marca.toLowerCase().includes(searchLower) ||
          p.tipo.toLowerCase().includes(searchLower) ||
          p.descripcion.toLowerCase().includes(searchLower)
      )

      return { filteredProducts: filtered }
    }),
}))