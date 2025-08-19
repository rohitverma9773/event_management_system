import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    qty: { type: Number, required: true, min: 1 },
    totalPrice: { type: Number, required: true, min: 0 }
  },
  { timestamps: true }
);

export default mongoose.model('Booking', bookingSchema);
