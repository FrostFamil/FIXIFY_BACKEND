const express = require('express');
const { body } = require('express-validator/check');

const User = require('../models/user');
const Fixer = require('../models/fixer');
const authController = require('../controllers/auth');
const profileController = require('../controllers/profile');

const router = express.Router();

router.put(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject('E-Mail address already exists!');
          }
        });
      })
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 5 }),
    body('firstName')
      .trim()
      .not()
      .isEmpty(),
    body('lastName')
    .trim()
    .not()
    .isEmpty(),
    body('phone')
    .trim()
    .not()
    .isEmpty()
  ],
  authController.signup
);

router.put(
  '/fixerSignup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return Fixer.findOne({ email: value }).then(fixerDoc => {
          if (fixerDoc) {
            return Promise.reject('E-Mail address already exists!');
          }
        });
      })
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 5 }),
    body('firstName')
      .trim()
      .not()
      .isEmpty(),
    body('lastName')
    .trim()
    .not()
    .isEmpty(),
    body('status')
    .trim()
    .not()
    .isEmpty(),
    body('phone')
      .trim()
      .not()
      .isEmpty()
  ],
  authController.fixerSignup
);

router.post('/login', authController.login);
router.post('/fixerLogin', authController.fixerLogin);

router.post('/profile', profileController.getUserProfile);
router.post('/fixerProfile', profileController.getFixerProfile);

router.post('/addCard', profileController.addUserCard);
router.post('/getCards', profileController.getCards);

module.exports = router;
