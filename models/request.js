const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const request = new Schema({
  latitudeFrom: {
    type: String,
    required: true
  },
  longitudeFrom: {
    type: String,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  acceptor: {
    type: Schema.Types.ObjectId,
    ref: 'Fixer',
    required: true
  },
  status: {
    type: String,
    default: "Not Accepted"
  },
  available: {
    type: String,
    default: "Yes"
  },
  price: {
    type: String,
    required: true
  },
  paymentType: {
    type: String,
    required: true
  },
  problem: {
    type: String,
    required: true
  },
  serviceType: {
    type: String,
    required: true
  },
  scheduled: {
    type: String,
    required: true
  }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Request', request);
