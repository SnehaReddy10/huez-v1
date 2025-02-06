import mongoose from 'mongoose';

const OfferSchema = new mongoose.Schema({
  name: { type: String, required: true },
  discount: {
    type: String,
    required: true,
    enum: ['Buy 1 Get 1', 'Percentage Off'],
  },
  value: {
    type: Number,
    default: 0,
  },
  image: { type: String, required: true },
  description: { type: String, required: true },
  startDate: {
    type: Date,
    required: true,
    default: () => new Date(),
  },
  endDate: {
    type: Date,
    required: true,
    default: () => new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
  },
  isActive: { type: Boolean, default: true },
});

const Offer = mongoose.model('Offer', OfferSchema);

export default Offer;
