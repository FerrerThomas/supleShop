import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CartItem from '../components/CartItem';

const CartPage: React.FC = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  
  const totalPrice = getTotalPrice();
  const shipping = totalPrice > 50 ? 0 : 8.99;
  const finalTotal = totalPrice + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="h-12 w-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Tu carrito está vacío
          </h2>
          <p className="text-gray-600 mb-8">
            ¡Explora nuestros productos y encuentra los mejores suplementos para ti!
          </p>
          <Link
            to="/productos"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Continuar Comprando
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/productos"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Continuar Comprando
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">
            Tu Carrito ({items.length} {items.length === 1 ? 'producto' : 'productos'})
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            {/* Clear Cart Button */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={clearCart}
                className="text-red-600 hover:text-red-700 text-sm font-medium underline transition-colors"
              >
                Vaciar Carrito
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Resumen del Pedido
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Envío:</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-600 font-medium">¡Gratis!</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>

                {shipping > 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-start space-x-2">
                      <Package className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm text-blue-800 font-medium">
                          ¡Casi tienes envío gratis!
                        </p>
                        <p className="text-xs text-blue-600">
                          Agrega ${(50 - totalPrice).toFixed(2)} más para envío gratuito
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <hr className="border-gray-200" />

                <div className="flex justify-between text-lg font-bold text-gray-800">
                  <span>Total:</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <div className="mt-6">
                {user ? (
                  <Link
                    to="/checkout"
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center block"
                  >
                    Proceder al Pago
                  </Link>
                ) : (
                  <div className="space-y-3">
                    <Link
                      to="/login"
                      state={{ from: { pathname: '/checkout' } }}
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center block"
                    >
                      Iniciar Sesión para Continuar
                    </Link>
                    <p className="text-sm text-gray-600 text-center">
                      ¿No tienes cuenta?{' '}
                      <Link to="/registro" className="text-blue-600 hover:text-blue-700 underline">
                        Regístrate aquí
                      </Link>
                    </p>
                  </div>
                )}
              </div>

              {/* Security Badge */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Package className="h-5 w-5 text-green-600" />
                  <span>Compra 100% segura y protegida</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;