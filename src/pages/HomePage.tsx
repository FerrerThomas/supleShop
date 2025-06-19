import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Truck, Shield, Zap } from 'lucide-react';
import { productApi } from '../api/products';
import { Product } from '../components/ProductCard';

const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // URL de imagen personalizable - puedes cambiar esta URL por la imagen que desees
  const HERO_BACKGROUND_IMAGE = 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop';

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const products = await productApi.getFeaturedProducts();
      setFeaturedProducts(products.slice(0, 3)); // Show only 3 products
    } catch (error) {
      console.error('Error fetching featured products:', error);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: Award,
      title: 'Productos Premium',
      description: 'Solo las mejores marcas y suplementos de calidad internacional'
    },
    {
      icon: Truck,
      title: 'Envío Gratis',
      description: 'Envío sin costo en compras superiores a $50.000'
    },
    {
      icon: Shield,
      title: 'Garantía Total',
      description: '100% de garantía en todos nuestros productos'
    },
    {
      icon: Zap,
      title: 'Resultados Rápidos',
      description: 'Suplementos diseñados para maximizar tu rendimiento'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Custom Background */}
      <section 
        className="relative bg-cover bg-center bg-no-repeat text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(220, 38, 38, 0.8), rgba(185, 28, 28, 0.8)), url(${HERO_BACKGROUND_IMAGE})`
        }}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Transforma tu 
              <span className="text-yellow-400"> Entrenamiento</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-red-100">
              Descubre los mejores suplementos deportivos para alcanzar tus objetivos fitness
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/productos"
                className="inline-flex items-center justify-center px-8 py-4 bg-yellow-500 text-red-900 font-semibold rounded-lg hover:bg-yellow-400 transition-all transform hover:scale-105 shadow-lg"
              >
                Ver Productos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/registro"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-red-800 transition-all"
              >
                Crear Cuenta
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products - AHORA PRIMERO */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Productos Destacados
            </h2>
            <p className="text-xl text-gray-600">
              Los suplementos más populares con los mejores precios
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProducts.map((product) => {
                const discountPercentage = product.originalPrice 
                  ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                  : 0;

                return (
                  <Link
                    key={product.id}
                    to={`/producto/${product.id}`}
                    className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                  >
                    <div className="relative">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                          ¡OFERTA!
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                          {product.type}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 mb-4">{product.brand}</p>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-red-600">
                            ${product.price.toLocaleString('es-AR')}
                          </span>
                          {product.originalPrice && (
                            <span className="text-lg text-gray-400 line-through ml-2">
                              ${product.originalPrice.toLocaleString('es-AR')}
                            </span>
                          )}
                        </div>
                        {discountPercentage > 0 && (
                          <span className="bg-red-500 text-white text-sm px-2 py-1 rounded-full font-bold">
                            -{discountPercentage}% OFF
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link
              to="/productos"
              className="inline-flex items-center px-8 py-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all transform hover:scale-105"
            >
              Ver Todos los Productos
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section - AHORA SEGUNDO */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              ¿Por qué elegir SupplementStore?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Somos líderes en suplementos deportivos con años de experiencia ayudando a atletas a alcanzar sus metas
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg bg-gray-50 hover:bg-red-50 transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 text-white rounded-full mb-4">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            ¿Listo para llevar tu entrenamiento al siguiente nivel?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Únete a miles de atletas que ya confían en nuestros productos para alcanzar sus objetivos
          </p>
          <Link
            to="/registro"
            className="inline-flex items-center px-8 py-4 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105"
          >
            Comenzar Ahora
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;