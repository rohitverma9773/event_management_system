import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
//import { seedManager } from './utils/seedManager.js';

import authRoutes from './routes/auth.routes.js';
import eventRoutes from './routes/event.route.js';
import bookingRoutes from './routes/booking.route.js';
import userRoutes from './routes/user.route.js';
import reviewRoutes from './routes/reviewsRoutes.js';

dotenv.config();
const app = express();

// Update CORS configuration for both development and production
const allowedOrigins = [
  'http://localhost:5173',
  'https://dwr-world-event-management-system.vercel.app' // Replace with your frontend URL
];

app.use(cors({ 
  origin: function(origin, callback) {
    if(!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true 
}));
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (_req, res) => res.send('EMS API running'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRoutes);

const start = async () => {
  await connectDB();
//   await seedManager(process.env.MANAGER_EMAIL, process.env.MANAGER_PASSWORD);
  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`Server on http://localhost:${port}`));
};
start();
