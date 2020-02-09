const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fixerCard = new Schema(
  {
    cardNumber: {
        type: String,
        required: true
    },
    expiryDate: {
      type: String,
      required: true
    },
    CVC: {
      type: String,
      required: true
    },
    creatorOfCard: {
      type: Schema.Types.ObjectId,
      ref: 'Fixer',
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('FixerCard', fixerCard);
