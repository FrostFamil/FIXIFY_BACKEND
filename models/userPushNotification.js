const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userPushNotificationSchema = new Schema({
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
  userId: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('userPushNotification', userPushNotificationSchema);
