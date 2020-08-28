const mongoose = require('mongoose');

const accountValidationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'El usuario es obligatorio']
  },
  hash: { type: String, required: true },
  account_type: {
    type: String,
    enum: {
      values: ['user', 'establishment'],
      message: 'El account_type puede ser user o establishment.'
    },
    required: [true, 'Es obligatorio establecer el tipo de cuenta.']
  },
  createdAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('AccountValidation', accountValidationSchema);
