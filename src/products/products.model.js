const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'El título es obligatorio'] },
  price: { type: Number, required: [true, 'El precio es obligatorio'] },
  image: { type: String },
  establishmentId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Establishment',
    required: [true, 'El establecimiento es obligatorio']
  },
  tags: [{ type: mongoose.Schema.ObjectId, ref: 'Tag' }]
});

module.exports = mongoose.model('Product', productSchema);
