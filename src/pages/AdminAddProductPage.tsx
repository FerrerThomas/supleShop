import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Save, X } from 'lucide-react';
import { productApi } from '../api/products';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

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

const AdminAddProductPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    type: '',
    brand: '',
    imageUrl: '',
    stock: '',
    rating: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Redirect if not admin
  React.useEffect(() => {
    if (!user?.isAdmin) {
      navigate('/');
      toast.error('Acceso denegado. Solo administradores pueden acceder a esta página.');
    }
  }, [user, navigate]);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre del producto es requerido';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es requerida';
    }

    if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = 'El precio debe ser un número válido mayor a 0';
    }

    if (formData.originalPrice && (isNaN(Number(formData.originalPrice)) || Number(formData.originalPrice) <= 0)) {
      newErrors.originalPrice = 'El precio original debe ser un número válido mayor a 0';
    }

    if (formData.originalPrice && Number(formData.originalPrice) <= Number(formData.price)) {
      newErrors.originalPrice = 'El precio original debe ser mayor al precio actual';
    }

    if (!formData.type) {
      newErrors.type = 'Selecciona una categoría';
    }

    if (!formData.brand) {
      newErrors.brand = 'Selecciona una marca';
    }

    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = 'La URL de la imagen es requerida';
    }

    if (!formData.stock || isNaN(Number(formData.stock)) || Number(formData.stock) < 0) {
      newErrors.stock = 'El stock debe ser un número válido mayor o igual a 0';
    }

    if (formData.rating && (isNaN(Number(formData.rating)) || Number(formData.rating) < 0 || Number(formData.rating) > 5)) {
      newErrors.rating = 'La calificación debe ser un número entre 0 y 5';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
        type: formData.type,
        brand: formData.brand,
        imageUrl: formData.imageUrl.trim(),
        stock: Number(formData.stock),
        rating: formData.rating ? Number(formData.rating) : undefined
      };

      await productApi.createProduct(productData);
      toast.success('Producto creado exitosamente');
      navigate('/productos');
    } catch (error: any) {
      console.error('Error creating product:', error);
      toast.error(error.response?.data?.message || 'Error al crear el producto');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      originalPrice: '',
      type: '',
      brand: '',
      imageUrl: '',
      stock: '',
      rating: ''
    });
    setErrors({});
  };

  if (!user?.isAdmin) {
    return null;
  }

  const discountPercentage = formData.originalPrice && formData.price 
    ? Math.round(((Number(formData.originalPrice) - Number(formData.price)) / Number(formData.originalPrice)) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/productos')}
            className="inline-flex items-center text-red-600 hover:text-red-700 mb-4 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Volver a Productos
          </button>
          <h1 className="text-3xl font-bold text-gray-800">
            Agregar Nuevo Producto
          </h1>
          <p className="text-gray-600 mt-2">
            Completa la información del producto para agregarlo al catálogo
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
              {/* Basic Information */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Información Básica</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre del Producto *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                        errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="Ej: Whey Protein Premium 1kg"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descripción *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none ${
                        errors.description ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="Describe las características y beneficios del producto..."
                    />
                    {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Categoría *
                      </label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                          errors.type ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Seleccionar categoría</option>
                        {PRODUCT_TYPES.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Marca *
                      </label>
                      <select
                        name="brand"
                        value={formData.brand}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                          errors.brand ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Seleccionar marca</option>
                        {BRANDS.map(brand => (
                          <option key={brand} value={brand}>{brand}</option>
                        ))}
                      </select>
                      {errors.brand && <p className="mt-1 text-sm text-red-600">{errors.brand}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Precios</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Precio Actual * (ARS)
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                        errors.price ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="0.00"
                    />
                    {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Precio Original (ARS) - Opcional
                    </label>
                    <input
                      type="number"
                      name="originalPrice"
                      value={formData.originalPrice}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                        errors.originalPrice ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="0.00"
                    />
                    {errors.originalPrice && <p className="mt-1 text-sm text-red-600">{errors.originalPrice}</p>}
                    {discountPercentage > 0 && (
                      <p className="mt-1 text-sm text-green-600">
                        Descuento: {discountPercentage}% OFF
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Información Adicional</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stock *
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                      min="0"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                        errors.stock ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="0"
                    />
                    {errors.stock && <p className="mt-1 text-sm text-red-600">{errors.stock}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Calificación (0-5) - Opcional
                    </label>
                    <input
                      type="number"
                      name="rating"
                      value={formData.rating}
                      onChange={handleInputChange}
                      min="0"
                      max="5"
                      step="0.1"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                        errors.rating ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="4.5"
                    />
                    {errors.rating && <p className="mt-1 text-sm text-red-600">{errors.rating}</p>}
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL de la Imagen *
                  </label>
                  <input
                    type="url"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                      errors.imageUrl ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                  {errors.imageUrl && <p className="mt-1 text-sm text-red-600">{errors.imageUrl}</p>}
                  <p className="mt-1 text-sm text-gray-500">
                    Usa una URL de imagen válida (ej: desde Pexels, Unsplash, etc.)
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`flex-1 flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all ${
                    isLoading
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-red-600 text-white hover:bg-red-700 transform hover:scale-105 active:scale-95'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Creando Producto...
                    </>
                  ) : (
                    <>
                      <Save className="h-5 w-5 mr-2" />
                      Crear Producto
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <X className="h-5 w-5 mr-2" />
                  Limpiar Formulario
                </button>
              </div>
            </form>
          </div>

          {/* Preview */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Vista Previa</h2>
              
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                {formData.imageUrl ? (
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="w-full h-48 object-contain bg-gray-50"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/4162451/pexels-photo-4162451.jpeg?auto=compress&cs=tinysrgb&w=400';
                    }}
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                    <Upload className="h-12 w-12 text-gray-400" />
                  </div>
                )}
                
                <div className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    {formData.type && (
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                        {formData.type}
                      </span>
                    )}
                    {formData.brand && (
                      <span className="text-gray-600 text-sm">{formData.brand}</span>
                    )}
                  </div>
                  
                  <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                    {formData.name || 'Nombre del producto'}
                  </h3>
                  
                  <div className="flex items-center space-x-2">
                    {formData.price && (
                      <span className="text-lg font-bold text-red-600">
                        ${Number(formData.price).toLocaleString('es-AR')}
                      </span>
                    )}
                    {formData.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        ${Number(formData.originalPrice).toLocaleString('es-AR')}
                      </span>
                    )}
                  </div>
                  
                  {discountPercentage > 0 && (
                    <span className="inline-block mt-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      -{discountPercentage}% OFF
                    </span>
                  )}
                  
                  {formData.stock && (
                    <p className="text-sm text-gray-600 mt-2">
                      Stock: {formData.stock} unidades
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAddProductPage;