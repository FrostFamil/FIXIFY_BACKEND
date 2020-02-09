const express = require('express');
const { body } = require('express-validator/check');

const Fixer = require('../models/fixer');
const fixersLocationController = require('../controllers/fixersLocation');

const router = express.Router();


router.put('/addFixersLoc', fixersLocationController.addFixersLoc);
router.put('/updateFixersLoc', fixersLocationController.updateFixersLoc);
router.post('/getFixersPreviousLoc', fixersLocationController.getFixerPreviousLoc);
router.post('/getFixersLoc', fixersLocationController.getFixersLoc);

module.exports = router;
