import express from 'express';
import Review from '../models/Review.js';

const router = express.Router();

// GET reviews with pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 6;
    const skip = (page - 1) * limit;

    const total = await Review.countDocuments();
    const reviews = await Review.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      reviews,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch reviews' });
  }
});

// POST add review
router.post('/', async (req, res) => {
  try {
    const { user, rating, comment } = req.body;
    if (!user || !rating || !comment) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const newReview = new Review({ user, rating, comment });
    await newReview.save();
    res.status(201).json({ message: 'Review added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add review' });
  }
});

export default router;
