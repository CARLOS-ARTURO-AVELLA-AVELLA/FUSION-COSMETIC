import { useState } from 'react'
import { ChevronDown, X } from 'lucide-react'
import { BRANDS, FRAGRANCE_TYPES, PRICE_RANGES } from '../../../../../utils/constants'

export default function Filters({ onFilterChange }) {
  const [activeFilter, setActiveFilter] = useState(null)
  const [selectedFilters, setSelectedFilters] = useState({
    priceRange: null,
    genders: [],
    brands: [],
    types: [],
  })

  const handlePriceChange = (range) => {
    setSelectedFilters(prev => ({ ...prev, priceRange: range }))
    onFilterChange({ ...selectedFilters, priceRange: range })
  }

  const handleGenderChange = (gender) => {
    const updated = selectedFilters.genders.includes(gender)
      ? selectedFilters.genders.filter(g => g !== gender)
      : [...selectedFilters.genders, gender]
    setSelectedFilters(prev => ({ ...prev, genders: updated }))
    onFilterChange({ ...selectedFilters, genders: updated })
  }

  const handleBrandChange = (brand) => {
    const updated = selectedFilters.brands.includes(brand)
      ? selectedFilters.brands.filter(b => b !== brand)
      : [...selectedFilters.brands, brand]
    setSelectedFilters(prev => ({ ...prev, brands: updated }))
    onFilterChange({ ...selectedFilters, brands: updated })
  }

  const handleTypeChange = (type) => {
    const updated = selectedFilters.types.includes(type)
      ? selectedFilters.types.filter(t => t !== type)
      : [...selectedFilters.types, type]
    setSelectedFilters(prev => ({ ...prev, types: updated }))
    onFilterChange({ ...selectedFilters, types: updated })
  }

  const handleResetFilters = () => {
    setSelectedFilters({
      priceRange: null,
      genders: [],
      brands: [],
      types: [],
    })
    onFilterChange({
      priceRange: null,
      genders: [],
      brands: [],
      types: [],
    })
  }

  // Contador de filtros activos
  const activeCount = (selectedFilters.genders?.length || 0) + 
                      (selectedFilters.brands?.length || 0) + 
                      (selectedFilters.types?.length || 0) + 
                      (selectedFilters.priceRange ? 1 : 0)

  return (
    <div className="bg-white rounded-lg p-6 shadow sticky top-24">
      {/* Header con título y contador */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-lg font-bold">Filtros</h3>
        {activeCount > 0 && (
          <button
            onClick={handleResetFilters}
            className="text-xs font-bold text-gold hover:text-red-500 transition flex items-center gap-1"
          >
            <X size={14} /> Limpiar ({activeCount})
          </button>
        )}
      </div>

      {/* RANGO DE PRECIO */}
      <div className="mb-6">
        <button
          onClick={() => setActiveFilter(activeFilter === 'price' ? null : 'price')}
          className="w-full flex items-center justify-between font-bold text-dark hover:text-gold transition py-2"
        >
          <span>Rango de Precio</span>
          <ChevronDown size={18} className={`transition ${activeFilter === 'price' ? 'rotate-180' : ''}`} />
        </button>

        {activeFilter === 'price' && (
          <div className="space-y-2 mt-3 pl-4 border-l-2 border-gold">
            {PRICE_RANGES.map((range) => (
              <label key={range.id} className="flex items-center gap-2 cursor-pointer hover:text-gold transition">
                <input
                  type="radio"
                  name="price"
                  checked={selectedFilters.priceRange?.id === range.id}
                  onChange={() => handlePriceChange(range)}
                  className="w-4 h-4 accent-gold"
                />
                <span className="text-sm">{range.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* GÉNERO */}
      <div className="mb-6">
        <button
          onClick={() => setActiveFilter(activeFilter === 'gender' ? null : 'gender')}
          className="w-full flex items-center justify-between font-bold text-dark hover:text-gold transition py-2"
        >
          <span>Género</span>
          <ChevronDown size={18} className={`transition ${activeFilter === 'gender' ? 'rotate-180' : ''}`} />
        </button>

        {activeFilter === 'gender' && (
          <div className="space-y-2 mt-3 pl-4 border-l-2 border-gold">
            <label className="flex items-center gap-2 cursor-pointer hover:text-gold transition">
              <input
                type="checkbox"
                checked={selectedFilters.genders.includes('mujer')}
                onChange={() => handleGenderChange('mujer')}
                className="w-4 h-4 accent-gold"
              />
              <span className="text-sm">Para Ella</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer hover:text-gold transition">
              <input
                type="checkbox"
                checked={selectedFilters.genders.includes('hombre')}
                onChange={() => handleGenderChange('hombre')}
                className="w-4 h-4 accent-gold"
              />
              <span className="text-sm">Para Él</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer hover:text-gold transition">
              <input
                type="checkbox"
                checked={selectedFilters.genders.includes('unisex')}
                onChange={() => handleGenderChange('unisex')}
                className="w-4 h-4 accent-gold"
              />
              <span className="text-sm">Unisex</span>
            </label>
          </div>
        )}
      </div>

      {/* MARCAS */}
      <div className="mb-6">
        <button
          onClick={() => setActiveFilter(activeFilter === 'brands' ? null : 'brands')}
          className="w-full flex items-center justify-between font-bold text-dark hover:text-gold transition py-2"
        >
          <span>Marcas</span>
          <ChevronDown size={18} className={`transition ${activeFilter === 'brands' ? 'rotate-180' : ''}`} />
        </button>

        {activeFilter === 'brands' && (
          <div className="space-y-2 mt-3 pl-4 border-l-2 border-gold max-h-48 overflow-y-auto">
            {BRANDS.map((brand) => (
              <label key={brand.id} className="flex items-center gap-2 cursor-pointer hover:text-gold transition">
                <input
                  type="checkbox"
                  checked={selectedFilters.brands.includes(brand.name)}
                  onChange={() => handleBrandChange(brand.name)}
                  className="w-4 h-4 accent-gold"
                />
                <span className="text-sm">{brand.logo} {brand.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* TIPO DE FRAGANCIA */}
      <div className="mb-6">
        <button
          onClick={() => setActiveFilter(activeFilter === 'types' ? null : 'types')}
          className="w-full flex items-center justify-between font-bold text-dark hover:text-gold transition py-2"
        >
          <span>Tipo de Fragancia</span>
          <ChevronDown size={18} className={`transition ${activeFilter === 'types' ? 'rotate-180' : ''}`} />
        </button>

        {activeFilter === 'types' && (
          <div className="space-y-2 mt-3 pl-4 border-l-2 border-gold">
            {FRAGRANCE_TYPES.map((type) => (
              <label key={type} className="flex items-center gap-2 cursor-pointer hover:text-gold transition">
                <input
                  type="checkbox"
                  checked={selectedFilters.types.includes(type)}
                  onChange={() => handleTypeChange(type)}
                  className="w-4 h-4 accent-gold"
                />
                <span className="text-sm">{type}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* RESET BUTTON */}
      {activeCount > 0 && (
        <button
          onClick={handleResetFilters}
          className="w-full py-2.5 rounded-lg font-bold text-white transition btn-dark"
        >
          Limpiar Todos los Filtros
        </button>
      )}
    </div>
  )
}