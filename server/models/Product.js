import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [200, 'Product name cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  originalPrice: {
    type: Number,
    min: [0, 'Original price cannot be negative']
  },
  type: {
    type: String,
    required: [true, 'Product type is required'],
    enum: ['Proteína', 'Creatina', 'Pre-entreno', 'Vitaminas', 'Quemadores de Grasa', 'Aminoácidos', 'Post-entreno']
  },
  brand: {
    type: String,
    required: [true, 'Brand is required'],
    enum: ['Star Nutrition', 'ENA', 'Universal Nutrition', 'Optimum Nutrition', 'BSN', 'MuscleTech', 'Dymatize']
  },
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required']
  },
  stock: {
    type: Number,
    required: [true, 'Stock is required'],
    min: [0, 'Stock cannot be negative'],
    default: 0
  },
  rating: {
    type: Number,
    min: [0, 'Rating cannot be less than 0'],
    max: [5, 'Rating cannot be more than 5'],
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better search performance
productSchema.index({ name: 'text', description: 'text', brand: 'text' });
productSchema.index({ type: 1, brand: 1 });
productSchema.index({ price: 1 });

export default mongoose.model('Product', productSchema);