const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fixerPushNotificationSchema = new Schema({
  token: {
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
  fixerId: {
    type: String,
    required: true
  },
  serviceType: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('fixerPushNotification', fixerPushNotificationSchema);
