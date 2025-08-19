import express from 'express';
import Event from '../models/event.js';
import Booking from '../models/Booking.js';
import { auth, requireRole } from '../middleware/auth.js';
import { sendMail } from '../helpers/SendMail.js';

const router = express.Router();

/** User: create booking */
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'user') return res.status(403).json({ message: 'Forbidden' });
  const { eventId, qty } = req.body;
  const event = await Event.findById(eventId);
  if (!event) return res.status(404).json({ message: 'Event not found' });

  const count = Number(qty || 1);
  if (count < 1) return res.status(400).json({ message: 'Invalid qty' });
  if (event.availableTickets < count)
    return res.status(400).json({ message: 'Not enough tickets' });

  event.availableTickets -= count;
  await event.save();

  const totalPrice = event.price * count;
  const booking = await Booking.create({
    user: req.user._id,
    event: event._id,
    qty: count,
    totalPrice
  });
  
  sendMail(req.user.email,`Booking Confirmation - ${event.title}`,"abcd",`<h2>Booking Confirmed!</h2>
        <p>Dear ${req.user.name},</p>
        <p>Thank you for booking <b>${count}</b> ticket(s) for <b>${event.title}</b>.</p>
        <p><b>Event Date:</b> ${new Date(event.date).toDateString()}</p>
        <p><b>Total Paid:</b> ₹${totalPrice}</p>
        <p>We look forward to seeing you!</p>`);

  res.status(201).json(booking);
});

/** User: my bookings */
router.get('/me', auth, async (req, res) => {
  if (req.user.role !== 'user') return res.status(403).json({ message: 'Forbidden' });
  const bookings = await Booking.find({ user: req.user._id })
    .populate('event')
    .sort({ createdAt: -1 });
  res.json(bookings);
});

/** Manager: all bookings */
router.get('/all', auth, requireRole('manager'), async (req, res) => {
  const bookings = await Booking.find()
    .populate('user', 'name email')
    .populate('event', 'title date price')
    .sort({ createdAt: -1 });
  res.json(bookings);
});

export default router;
