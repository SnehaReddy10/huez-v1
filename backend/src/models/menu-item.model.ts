import mongoose from 'mongoose';
import { Cuisine, MenuItemCategory } from '../constants/enums/menu-item';

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  category: { type: String, enum: MenuItemCategory },
  cuisine: { type: String, enum: Cuisine },
  isVeg: { type: Boolean, default: false },
  isVegan: { type: Boolean, default: false },
  inStock: { type: Number, required: true },
  calories: { type: Number, required: true },
});

menuItemSchema.index({ name: 'text', description: 'text' });

export const MenuItem = mongoose.model('MenuItem', menuItemSchema);
