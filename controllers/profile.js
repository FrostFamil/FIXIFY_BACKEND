const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator/check');

const User = require('../models/user');
const Fixer = require('../models/fixer');

const Card = require('../models/card');
const FixerCard = require('../models/fixerCard');

exports.getUserProfile = (req, res, next) => {
  const userId = req.body.userId;
  
  User.findById(userId)
    .then(user => {
      if (!user) {
        const error = new Error('Could not find user.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: 'User fetched.', user: user });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getFixerProfile = (req, res, next) => {
  const fixerId = req.body.fixerId;
  
  Fixer.findById(fixerId)
    .then(fixer => {
      if (!fixer) {
        const error = new Error('Could not find fixer.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: 'Fixer fetched.', fixer: fixer });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.addUserCard = (req, res, next) => {

  const cardNumber = req.body.cardNumber;
  const expMonth = req.body.expMonth.toString().length === 2 ? req.body.expMonth: "0"+req.body.expMonth;
  const expYear = req.body.expYear;
  const creatorOfCard = req.body.creatorOfCard;
  let creator;
  
  User.findById(creatorOfCard)
    .then(user => {
      creator = user;
      user.cards.push({
        cardNumber,
        expMonth,
        expYear
      });
      return user.save();
    })
    .then(result => {
      res.status(201).json({
        message: 'Card Added successfully!',
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getCards = (req, res, next) => {

  const creatorOfCard = req.body.creatorOfCard;

  User.findById(creatorOfCard).then(result => {
    return result;
  })
  .then(cards => {
      res.status(200).json({
        message: 'Fetched cards successfully.',
        cards: cards.cards
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
