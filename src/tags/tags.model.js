const mongoose = require("mongoose")

const tagSchema = new mongoose.Schema({
  text: String,
  establishmentId: { type: mongoose.Schema.ObjectId, ref: "Establishment" }
})

module.exports = mongoose.model("Tag", tagSchema)
