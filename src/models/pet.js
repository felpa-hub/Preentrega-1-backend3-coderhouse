
const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
