const mongoose = require('mongoose');
const validator = require('validator');

const establishmentSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'El nombre es obligatorio'] },
  username: { type: String, required: [true, 'El username es obligatorio'] },
  password: { type: String, required: [true, 'El password es obligatorio'] },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    validate: [validator.isEmail, 'Email inválido']
  },
  validated: { type: Boolean, default: false },
  active: { type: Boolean, default: true },
  lat: Number,
  lng: Number,
  plusCode: String
});

module.exports = mongoose.model('Establishment', establishmentSchema);
