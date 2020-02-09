const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema(
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
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Card', cardSchema);
