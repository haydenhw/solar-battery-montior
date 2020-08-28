const mongoose = require('mongoose');

const statusTypes = ['ORDERED', 'IN-PROCESS', 'READY', 'FINISHED'];

const orderSchema = new mongoose.Schema({
  products: [{ type: mongoose.Schema.ObjectId, ref: 'Product' }],
  name: { type: String, required: [true, 'El nombre es obligatorio'] },
  table: { type: String },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'El usuario es obligatorio']
  },
  establishmentId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Establishment',
    required: [true, 'El establecimiento es obligatorio']
  },
  status: { type: String, default: 'ORDERED' },
  createdAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Orders', orderSchema);
