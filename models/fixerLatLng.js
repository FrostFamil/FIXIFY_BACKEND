const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fixerLatLng = new Schema({
  latitude: {
    type: String,
    required: true
  },
  longitude: {
    type: String,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'Fixer',
    required: true
  }
  },
  { timestamps: true }
);

module.exports = mongoose.model('FixerLatLng', fixerLatLng);
