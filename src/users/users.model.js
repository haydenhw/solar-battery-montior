const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  username: { type: String, required: [true, 'El username es obligatorio'] },
  password: { type: String, required: [true, 'El password es obligatorio'] },
  name: { type: String, required: [true, 'El nombre es obligatorio'] },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    validate: [validator.isEmail, 'Email inválido']
  },
  facebookId: String,
  googleId: String,
  avatarUrl: String,
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('User', userSchema);
