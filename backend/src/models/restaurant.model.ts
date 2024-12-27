import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true },
  },
  merchant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  cuisine: [String],
  isOpen: { type: Boolean, default: true },
  menu: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }],
  createdAt: { type: Date, default: Date.now },
});

restaurantSchema.index({ location: '2dsphere' });

export const Restaurant = mongoose.model('Restaurant', restaurantSchema);
