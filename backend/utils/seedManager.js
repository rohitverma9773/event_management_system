import User from '../models/User.js';

export const seedManager = async (email, password) => {
  const exists = await User.findOne({ email });
  if (exists) return exists;
  const manager = new User({
    name: 'Event Manager',
    email,
    password,
    role: 'manager'
  });
  await manager.save();
  console.log('Default Manager seeded:', email);
  return manager;
};
