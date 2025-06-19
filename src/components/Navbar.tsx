import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const PRODUCT_CATEGORIES = [
  { name: 'Proteínas', value: 'Proteína' },
  { name: 'Creatinas', value: 'Creatina' },
  { name: 'Pre-entrenos', value: 'Pre-entreno' },
  { name: 'Vitaminas', value: 'Vitaminas' },
  { name: 'Quemadores de Grasa', value: 'Quemadores de Grasa' },
  { name: 'Aminoácidos', value: 'Aminoácidos' },
  { name: 'Post-entrenos', value: 'Post-entreno' }
];

const OFFERS = [
  "🎯 25% OFF con cuenta DNI",
  "🚚 Envío GRATIS a partir de $150.000",
  "💰 10% OFF pagando en efectivo",
  "⚡ Hasta 12 cuotas sin interés",
  "🎁 2x1 en productos seleccionados"
];

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false);
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: 'Inicio', href: '/', current: location.pathname === '/' },
    { name: 'Productos', href: '/productos', current: location.pathname === '/productos', hasDropdown: true },
    { name: 'Contacto', href: '/contacto', current: location.pathname === '/contacto' },
  ];

  const totalItems = getTotalItems();

  // Rotar ofertas cada 3 segundos con efecto fade
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOfferIndex((prevIndex) => (prevIndex + 1) % OFFERS.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleCategoryClick = (categoryValue: string) => {
    navigate(`/productos?category=${encodeURIComponent(categoryValue)}`);
    setIsProductsMenuOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Offers Bar with Fade Effect - Más fino */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-2 text-center text-sm font-medium overflow-hidden relative">
        <div className="relative h-5">
          {OFFERS.map((offer, index) => (
            <div 
              key={index}
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ease-in-out ${
                index === currentOfferIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {offer}
            </div>
          ))}
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="/image.png" 
                alt="SupplementStore Logo" 
                className="h-10 w-10 object-contain"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                SupplementStore
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {navigation.map((item) => (
                <div key={item.name} className="relative">
                  {item.hasDropdown ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setIsProductsMenuOpen(true)}
                      onMouseLeave={() => setIsProductsMenuOpen(false)}
                    >
                      <Link
                        to={item.href}
                        className={`flex items-center space-x-1 px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                          item.current
                            ? 'bg-red-600 text-white shadow-lg transform scale-105'
                            : 'text-gray-700 hover:bg-red-50 hover:text-red-600 hover:shadow-md'
                        }`}
                      >
                        <span>{item.name}</span>
                        <ChevronDown className="h-4 w-4" />
                      </Link>
                      
                      {/* Products Dropdown */}
                      {isProductsMenuOpen && (
                        <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 transform opacity-100 scale-100 transition-all duration-200">
                          <Link
                            to="/productos"
                            className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors rounded-lg mx-2"
                            onClick={() => setIsProductsMenuOpen(false)}
                          >
                            <span className="font-medium">Todos los Productos</span>
                          </Link>
                          <hr className="my-2 border-gray-100 mx-2" />
                          {PRODUCT_CATEGORIES.map((category) => (
                            <button
                              key={category.value}
                              onClick={() => handleCategoryClick(category.value)}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors rounded-lg mx-2"
                            >
                              {category.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        item.current
                          ? 'bg-red-600 text-white shadow-lg transform scale-105'
                          : 'text-gray-700 hover:bg-red-50 hover:text-red-600 hover:shadow-md'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop Right Side */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Cart */}
              <Link
                to="/carrito"
                className="relative p-3 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-300 hover:shadow-md"
              >
                <ShoppingCart className="h-6 w-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* User Menu */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-300 hover:shadow-md"
                  >
                    <div className="bg-gradient-to-br from-red-600 to-red-700 p-1 rounded-full">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm font-medium">{user.username}</span>
                  </button>
                  
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 transform opacity-100 scale-100 transition-all duration-200">
                      <Link
                        to="/perfil"
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors rounded-lg mx-2"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Mi Perfil
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors rounded-lg mx-2"
                      >
                        <div className="flex items-center space-x-2">
                          <LogOut className="h-4 w-4" />
                          <span>Cerrar Sesión</span>
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="px-5 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-300"
                  >
                    Iniciar Sesión
                  </Link>
                  <Link
                    to="/registro"
                    className="px-5 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-medium rounded-full hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Registrarse
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-full text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-300"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-4 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.href}
                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                      item.current
                        ? 'text-red-600 bg-red-50 shadow-md'
                        : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  
                  {/* Mobile Categories */}
                  {item.hasDropdown && (
                    <div className="ml-4 mt-2 space-y-1">
                      {PRODUCT_CATEGORIES.map((category) => (
                        <button
                          key={category.value}
                          onClick={() => handleCategoryClick(category.value)}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300"
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Mobile Cart */}
              <Link
                to="/carrito"
                className="flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Carrito ({totalItems})</span>
              </Link>

              {/* Mobile Auth */}
              {user ? (
                <div className="border-t border-gray-100 pt-3 mt-3">
                  <div className="flex items-center space-x-3 px-4 py-2">
                    <div className="bg-gradient-to-br from-red-600 to-red-700 p-2 rounded-full">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-base font-medium text-gray-700">{user.username}</span>
                  </div>
                  <Link
                    to="/perfil"
                    className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Mi Perfil
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 rounded-xl text-base font-medium text-red-600 hover:bg-red-50 transition-all duration-300"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              ) : (
                <div className="border-t border-gray-100 pt-3 mt-3 space-y-2">
                  <Link
                    to="/login"
                    className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Iniciar Sesión
                  </Link>
                  <Link
                    to="/registro"
                    className="block px-4 py-3 rounded-xl text-base font-medium bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg mx-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Registrarse
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;