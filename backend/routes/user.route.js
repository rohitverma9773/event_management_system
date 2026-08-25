import express from 'express';
import User from '../models/User.js';
import { auth, requireRole } from '../middleware/auth.js';

const router = express.Router();

/** Manager: see all users (only role=user) */
router.get('/', auth, requireRole('manager'), async (req, res) => {
  const users = await User.find({ role: 'user' }).select('-password').sort({ createdAt: -1 });
  res.json(users);
});

export default router;
