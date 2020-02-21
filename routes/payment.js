const express = require('express');

const paymentController = require('../controllers/payment');

const router = express.Router();

router.post('/chargeCreditCard', paymentController.payWithStripe);

module.exports = router;
