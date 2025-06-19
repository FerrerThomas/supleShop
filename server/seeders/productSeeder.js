import Product from '../models/Product.js';

const sampleProducts = [
  {
    name: 'Combo Whey 1kg + Creatina 300gr XXL',
    description: 'Combo perfecto para maximizar tu rendimiento. Incluye proteína de suero de alta calidad con sabor a chocolate y creatina micronizada para mayor absorción. Ideal para post-entrenamiento y aumento de masa muscular.',
    price: 36720,
    originalPrice: 45800,
    type: 'Proteína',
    brand: 'Star Nutrition',
    imageUrl: 'https://images.pexels.com/photos/4162451/pexels-photo-4162451.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock: 15,
    rating: 4.8
  },
  {
    name: 'Combo Iron Bar Gentech 2 Unidades X 20u',
    description: 'Barras energéticas de alta calidad con proteínas y carbohidratos complejos. Perfectas para antes o después del entrenamiento. Sabor chocolate con trozos de almendras.',
    price: 57800,
    originalPrice: 68000,
    type: 'Creatina',
    brand: 'ENA',
    imageUrl: 'https://images.pexels.com/photos/4047186/pexels-photo-4047186.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock: 23,
    rating: 4.7
  },
  {
    name: 'Scoop Suplementación La Plata Varios Colores X 1u',
    description: 'Cuchara medidora profesional para suplementos. Fabricada en material resistente y libre de BPA. Medida estándar de 30ml. Disponible en varios colores.',
    price: 1500,
    type: 'Pre-entreno',
    brand: 'Universal Nutrition',
    imageUrl: 'https://images.pexels.com/photos/4162485/pexels-photo-4162485.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock: 8,
    rating: 4.9
  },
  {
    name: 'Combo Whey Protein True Made Ena 2 Unidades X 2.05 Lbs',
    description: 'Proteína de suero premium con aminoácidos esenciales. Fórmula de rápida absorción ideal para recuperación muscular. Sabor vainilla natural sin azúcares añadidos.',
    price: 68220,
    originalPrice: 75800,
    type: 'Vitaminas',
    brand: 'Optimum Nutrition',
    imageUrl: 'https://images.pexels.com/photos/4047172/pexels-photo-4047172.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock: 30,
    rating: 4.5
  },
  {
    name: 'Quemador de Grasa Termogénico',
    description: 'Potente quemador con extractos naturales para acelerar el metabolismo.',
    price: 78990,
    type: 'Quemadores de Grasa',
    brand: 'BSN',
    imageUrl: 'https://images.pexels.com/photos/4162493/pexels-photo-4162493.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock: 12,
    rating: 4.6
  },
  {
    name: 'BCAA 2:1:1 Instantáneo',
    description: 'Aminoácidos ramificados para recuperación muscular durante el entrenamiento.',
    price: 54990,
    type: 'Aminoácidos',
    brand: 'MuscleTech',
    imageUrl: 'https://images.pexels.com/photos/4162458/pexels-photo-4162458.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock: 18,
    rating: 4.4
  },
  {
    name: 'Post-Workout Recovery',
    description: 'Fórmula de recuperación con glutamina, creatina y carbohidratos.',
    price: 61990,
    type: 'Post-entreno',
    brand: 'Dymatize',
    imageUrl: 'https://images.pexels.com/photos/4162472/pexels-photo-4162472.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock: 9,
    rating: 4.7
  },
  {
    name: 'Whey Isolate Vainilla',
    description: 'Proteína aislada de suero con mínimo contenido de lactosa y grasas.',
    price: 109990,
    type: 'Proteína',
    brand: 'Star Nutrition',
    imageUrl: 'https://images.pexels.com/photos/4162451/pexels-photo-4162451.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock: 7,
    rating: 4.9
  }
];

export const seedProducts = async () => {
  try {
    const existingProducts = await Product.countDocuments();
    
    if (existingProducts === 0) {
      console.log('🌱 Seeding products...');
      await Product.insertMany(sampleProducts);
      console.log('✅ Products seeded successfully');
    } else {
      console.log('📦 Products already exist in database');
    }
  } catch (error) {
    console.error('❌ Error seeding products:', error);
  }
};