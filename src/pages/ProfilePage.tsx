import React, { useState } from 'react';
import { User, Package, Settings, LogOut, Edit, Save, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Mock orders data
const mockOrders = [
  {
    id: 'ORDER-1703123456789',
    date: '2024-01-15',
    status: 'delivered',
    total: 156.97,
    items: [
      { name: 'Whey Protein Premium', quantity: 2, price: 89.99 },
      { name: 'Creatina Monohidrato', quantity: 1, price: 45.99 }
    ]
  },
  {
    id: 'ORDER-1702987654321',
    date: '2024-01-08',
    status: 'shipped',
    total: 67.99,
    items: [
      { name: 'Pre-Workout Extreme', quantity: 1, price: 67.99 }
    ]
  },
  {
    id: 'ORDER-1702851234567',
    date: '2024-01-02',
    status: 'confirmed',
    total: 123.97,
    items: [
      { name: 'Multivitamínico Completo', quantity: 1, price: 32.99 },
      { name: 'BCAA 2:1:1', quantity: 2, price: 54.99 }
    ]
  }
];

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'settings'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    postalCode: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'confirmed':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'Entregado';
      case 'shipped':
        return 'Enviado';
      case 'confirmed':
        return 'Confirmado';
      default:
        return 'Pendiente';
    }
  };

  const handleSaveProfile = () => {
    // Aquí se enviarían los datos al backend
    setIsEditing(false);
    // toast.success('Perfil actualizado correctamente');
  };

  const TabButton = ({ tab, icon: Icon, label }: { tab: string, icon: any, label: string }) => (
    <button
      onClick={() => setActiveTab(tab as any)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
        activeTab === tab
          ? 'bg-blue-600 text-white'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Mi Cuenta</h1>
          <p className="text-gray-600 mt-2">Gestiona tu información personal y pedidos</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-blue-600 rounded-full p-3">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{user?.username}</h3>
                  <p className="text-sm text-gray-600">{user?.email}</p>
                </div>
              </div>

              <nav className="space-y-2">
                <TabButton tab="profile" icon={User} label="Mi Perfil" />
                <TabButton tab="orders" icon={Package} label="Mis Pedidos" />
                <TabButton tab="settings" icon={Settings} label="Configuración" />
                
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Cerrar Sesión</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Información Personal</h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                      <span>Editar</span>
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSaveProfile}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Save className="h-4 w-4" />
                        <span>Guardar</span>
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        <X className="h-4 w-4" />
                        <span>Cancelar</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre de Usuario
                    </label>
                    <input
                      type="text"
                      value={profileData.username}
                      onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border rounded-lg ${
                        isEditing
                          ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border rounded-lg ${
                        isEditing
                          ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border rounded-lg ${
                        isEditing
                          ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                      placeholder="Ingresa tu teléfono"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ciudad
                    </label>
                    <input
                      type="text"
                      value={profileData.city}
                      onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border rounded-lg ${
                        isEditing
                          ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                      placeholder="Ingresa tu ciudad"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dirección
                    </label>
                    <input
                      type="text"
                      value={profileData.address}
                      onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border rounded-lg ${
                        isEditing
                          ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                      placeholder="Ingresa tu dirección completa"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">Mis Pedidos</h2>
                  
                  {mockOrders.length === 0 ? (
                    <div className="text-center py-8">
                      <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        No tienes pedidos aún
                      </h3>
                      <p className="text-gray-600">
                        ¡Explora nuestros productos y realiza tu primera compra!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {mockOrders.map((order) => (
                        <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h4 className="font-semibold text-gray-800">
                                Pedido #{order.id}
                              </h4>
                              <p className="text-sm text-gray-600">
                                Fecha: {new Date(order.date).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                {getStatusText(order.status)}
                              </span>
                              <p className="text-lg font-bold text-gray-800 mt-1">
                                ${order.total.toFixed(2)}
                              </p>
                            </div>
                          </div>
                          
                          <div className="border-t border-gray-100 pt-3">
                            <h5 className="text-sm font-medium text-gray-700 mb-2">Productos:</h5>
                            <ul className="space-y-1">
                              {order.items.map((item, index) => (
                                <li key={index} className="text-sm text-gray-600 flex justify-between">
                                  <span>{item.name} x{item.quantity}</span>
                                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Configuración</h2>
                
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Notificaciones</h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                        <span className="ml-3 text-gray-700">Recibir emails sobre nuevos productos</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                        <span className="ml-3 text-gray-700">Notificaciones de pedidos</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        <span className="ml-3 text-gray-700">Ofertas y promociones</span>
                      </label>
                    </div>
                  </div>

                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Privacidad</h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                        <span className="ml-3 text-gray-700">Hacer mi perfil público</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        <span className="ml-3 text-gray-700">Permitir análisis de datos</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Zona Peligrosa</h3>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                      Eliminar Cuenta
                    </button>
                    <p className="text-sm text-gray-600 mt-2">
                      Esta acción no se puede deshacer. Se eliminarán todos tus datos permanentemente.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;