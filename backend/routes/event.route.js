import express from 'express';
import Event from '../models/event.js';
import { auth, requireRole } from '../middleware/auth.js';

const router = express.Router();

/** Public: list events */
router.get('/', async (req, res) => {
  const events = await Event.find().sort({ date: 1 });
  res.json(events);
});

/** Manager: create event */
router.post('/', auth, requireRole('manager'), async (req, res) => {
  const { title, description, date, location, price, totalTickets } = req.body;
  if (!title || !date || price == null || totalTickets == null)
    return res.status(400).json({ message: 'Missing fields' });

  const event = await Event.create({
    title,
    description,
    date,
    location,
    price,
    totalTickets,
    availableTickets: totalTickets,
    createdBy: req.user._id
  });
  res.status(201).json(event);
});

/** Manager: update event */
router.put('/:id', auth, requireRole('manager'), async (req, res) => {
  const evt = await Event.findById(req.params.id);
  if (!evt) return res.status(404).json({ message: 'Not found' });

  const fields = ['title', 'description', 'date', 'location', 'price', 'totalTickets'];
  fields.forEach(f => {
    if (req.body[f] != null) evt[f] = req.body[f];
  });
  // keep availableTickets aligned if totalTickets decreased below bookings left
  if (req.body.totalTickets != null) {
    const used = evt.totalTickets - evt.availableTickets;
    const newAvail = Math.max(0, req.body.totalTickets - used);
    evt.availableTickets = newAvail;
  }

  await evt.save();
  res.json(evt);
});

/** Manager: delete event */
router.delete('/:id', auth, requireRole('manager'), async (req, res) => {
  const evt = await Event.findById(req.params.id);
  if (!evt) return res.status(404).json({ message: 'Not found' });
  await evt.deleteOne();
  res.json({ message: 'Deleted' });
});

export default router;
