const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fixerHistory = new Schema(
  {
    from: {
        type: String,
        required: true
    },
    to: {
      type: String,
      required: true
    },
    latitude: {
      type: String,
      required: true
    },
    longitude: {
        type: String,
        required: true
      },
    orderedUser: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    acceptedUser: {
      type: Schema.Types.ObjectId,
      ref: 'Fixer',
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('FixerHistory', fixerHistory);
