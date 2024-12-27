import mongoose from 'mongoose';
import { Cuisine, MenuItemCategory } from '../constants/enums/menu-item';

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  category: { type: String, enum: MenuItemCategory },
  cuisine: { type: String, enum: Cuisine },
  isVeg: { type: Boolean, required: true },
  inStock: { type: Number, required: true },
});

export const MenuItem = mongoose.model('MenuItem', menuItemSchema);
