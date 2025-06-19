import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  type: string;
  brand: string;
  imageUrl: string;
  stock: number;
  rating?: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevenir navegación cuando se hace click en el botón
    e.stopPropagation(); // Evitar que el evento se propague al Link
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      type: product.type,
      brand: product.brand
    });
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link 
      to={`/producto/${product.id}`}
      className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden group block"
    >
      <div className="relative p-4">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-contain group-hover:scale-105 transition-transform duration-300"
        />
        {discountPercentage > 0 && (
          <div className="absolute top-2 left-2">
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              -{discountPercentage}% OFF
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4 pt-0">
        <h3 className="text-sm text-gray-700 mb-3 line-clamp-2 leading-tight">
          {product.name}
        </h3>
        
        <div className="mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price.toLocaleString('es-AR')}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${product.originalPrice.toLocaleString('es-AR')}
              </span>
            )}
          </div>
        </div>
        
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`w-full py-3 px-4 rounded-lg font-medium text-sm transition-all ${
            product.stock === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-red-500 text-white hover:bg-red-600 transform hover:scale-105 active:scale-95'
          }`}
        >
          {product.stock === 0 ? (
            'Sin Stock'
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <span>COMPRAR</span>
              <ShoppingCart className="h-4 w-4" />
            </div>
          )}
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;