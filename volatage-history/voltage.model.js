import mongoose from 'mongoose';

const voltageSchema = new mongoose.Schema({
  volatage: Number,
  timestamps: { createdAt: 'createdAt' }
});
const Voltage = mongoose.model('Voltage', voltageSchema, 'Voltage');
