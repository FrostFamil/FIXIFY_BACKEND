const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Fixer = require('../models/fixer');

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const phone = req.body.phone;
  const password = req.body.password;
  bcrypt
    .hash(password, 12)
    .then(hashedPw => {
      const user = new User({
        email: email,
        password: hashedPw,
        firstName: firstName,
        lastName: lastName,
        phone: phone
      });
      return user.save();
    })
    .then(result => {
      res.status(201).json({ message: 'User created!', userId: result._id });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.fixerSignup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const phone = req.body.phone;
  const status = req.body.status;
  const password = req.body.password;
  bcrypt
    .hash(password, 12)
    .then(hashedPw => {
      const fixer = new Fixer({
        email: email,
        password: hashedPw,
        firstName: firstName,
        lastName: lastName,
        status: status,
        phone: phone
      });
      return fixer.save();
    })
    .then(result => {
      res.status(201).json({ message: 'Fixer created!', userId: result._id });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        const error = new Error('A user with this email could not be found.');
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
      if (!isEqual) {
        const error = new Error('Wrong password!');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString()
        },
        'somesupersecretsecret',
        { expiresIn: '1h' }
      );
      res.status(200).json({ email: email, token: token, userId: loadedUser._id.toString() });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.fixerLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedFixer;
  Fixer.findOne({ email: email })
    .then(fixer => {
      if (!fixer) {
        const error = new Error('A fixer with this email could not be found.');
        error.statusCode = 401;
        throw error;
      }
      loadedFixer = fixer;
      return bcrypt.compare(password, fixer.password);
    })
    .then(isEqual => {
      if (!isEqual) {
        const error = new Error('Wrong password!');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedFixer.email,
          userId: loadedFixer._id.toString()
        },
        'somesupersecretsecret',
        { expiresIn: '1h' }
      );
      res.status(200).json({ email: email, token: token, fixerId: loadedFixer._id.toString() });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
