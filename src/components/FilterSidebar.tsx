import React, { useState } from 'react';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';

export interface FilterState {
  types: string[];
  brands: string[];
  minPrice: number;
  maxPrice: number;
}

interface FilterSidebarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const PRODUCT_TYPES = [
  'Proteína',
  'Creatina',
  'Pre-entreno',
  'Vitaminas',
  'Quemadores de Grasa',
  'Aminoácidos',
  'Post-entreno'
];

const BRANDS = [
  'Star Nutrition',
  'ENA',
  'Universal Nutrition',
  'Optimum Nutrition',
  'BSN',
  'MuscleTech',
  'Dymatize'
];

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFiltersChange,
  isOpen,
  onToggle
}) => {
  const [expandedSections, setExpandedSections] = useState({
    types: true,
    brands: true,
    price: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleTypeChange = (type: string) => {
    const newTypes = filters.types.includes(type)
      ? filters.types.filter(t => t !== type)
      : [...filters.types, type];
    
    onFiltersChange({ ...filters, types: newTypes });
  };

  const handleBrandChange = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    
    onFiltersChange({ ...filters, brands: newBrands });
  };

  const handlePriceChange = (field: 'minPrice' | 'maxPrice', value: number) => {
    onFiltersChange({ ...filters, [field]: value });
  };

  const resetFilters = () => {
    onFiltersChange({
      types: [],
      brands: [],
      minPrice: 0,
      maxPrice: 200000
    });
  };

  const FilterSection = ({ title, isExpanded, onToggle, children }: {
    title: string;
    isExpanded: boolean;
    onToggle: () => void;
    children: React.ReactNode;
  }) => (
    <div className="border-b border-gray-200 pb-4">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-2 text-left"
      >
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </button>
      {isExpanded && <div className="mt-3">{children}</div>}
    </div>
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={onToggle}
          className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Filter className="h-5 w-5" />
          <span>Filtros</span>
        </button>
      </div>

      {/* Filter Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-lg transform transition-transform duration-300
        lg:relative lg:inset-auto lg:transform-none lg:shadow-none lg:bg-gray-50 lg:rounded-lg lg:p-6
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full overflow-y-auto p-6 lg:p-0">
          {/* Mobile Header */}
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <h2 className="text-xl font-bold text-gray-800">Filtros</h2>
            <button
              onClick={onToggle}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:flex lg:items-center lg:justify-between lg:mb-6">
            <h2 className="text-xl font-bold text-gray-800">Filtros</h2>
            <button
              onClick={resetFilters}
              className="text-sm text-red-600 hover:text-red-700 underline"
            >
              Limpiar
            </button>
          </div>

          <div className="space-y-6">
            {/* Product Types */}
            <FilterSection
              title="Categorías"
              isExpanded={expandedSections.types}
              onToggle={() => toggleSection('types')}
            >
              <div className="space-y-2">
                {PRODUCT_TYPES.map(type => (
                  <label key={type} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.types.includes(type)}
                      onChange={() => handleTypeChange(type)}
                      className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            </FilterSection>

            {/* Brands */}
            <FilterSection
              title="Marcas"
              isExpanded={expandedSections.brands}
              onToggle={() => toggleSection('brands')}
            >
              <div className="space-y-2">
                {BRANDS.map(brand => (
                  <label key={brand} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.brands.includes(brand)}
                      onChange={() => handleBrandChange(brand)}
                      className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm text-gray-700">{brand}</span>
                  </label>
                ))}
              </div>
            </FilterSection>

            {/* Price Range */}
            <FilterSection
              title="Rango de Precio"
              isExpanded={expandedSections.price}
              onToggle={() => toggleSection('price')}
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Precio mínimo</label>
                  <input
                    type="number"
                    value={filters.minPrice}
                    onChange={(e) => handlePriceChange('minPrice', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Precio máximo</label>
                  <input
                    type="number"
                    value={filters.maxPrice}
                    onChange={(e) => handlePriceChange('maxPrice', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    min="0"
                  />
                </div>
              </div>
            </FilterSection>
          </div>

          {/* Mobile Apply Button */}
          <div className="lg:hidden mt-8">
            <button
              onClick={onToggle}
              className="w-full px-4 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
            >
              Aplicar Filtros
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
    </>
  );
};

export default FilterSidebar;