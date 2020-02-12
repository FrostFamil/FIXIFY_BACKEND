const express = require('express');
const { body } = require('express-validator/check');

const User = require('../models/user');
const Fixer = require('../models/fixer');
const fixerPushNotification = require('../models/fixerPushNotification');

const notificationController = require('../controllers/notifications');

const router = express.Router();

router.post('/saveFixersToken', notificationController.addFixersPushToken);
router.post('/getFixersToken', notificationController.getFixersPushToken);


module.exports = router;
