import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    user: { type: String, required: true }, // could also link to User model
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Review', reviewSchema);
