const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fixerSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  history: [
    {
      type: Object,
      ref: 'FixerHistory'
    }
  ],
  cards: [
    {
      type: Object,
      ref: 'FixerCard'
    }
  ]
});

module.exports = mongoose.model('Fixer', fixerSchema);
