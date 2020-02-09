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
  const expiryDate = req.body.expiryDate;
  const CVC = req.body.CVC;
  const creatorOfCard = req.body.creatorOfCard;
  let creator;
  let hashedCvc;
  
  bcrypt
    .hash(CVC, 12)
    .then(hashedCVC => {
      const card = new Card({
        cardNumber: cardNumber,
        expiryDate: expiryDate,
        CVC: hashedCVC,
        creatorOfCard: creatorOfCard 
      });
      hashedCvc = hashedCVC;
      return card.save()
    })
    .then(result => {
      return User.findById(creatorOfCard);
    })
    .then(user => {
      creator = user;
      user.cards.push({
        cardNumber,
        expiryDate,
        hashedCvc
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

exports.addFixerCard = (req, res, next) => {

  const cardNumber = req.body.cardNumber;
  const expiryDate = req.body.expiryDate;
  const CVC = req.body.CVC;
  const creatorOfCard = req.body.creatorOfCard;
  let creator;
  let hashedCvc;
  
  bcrypt
    .hash(CVC, 12)
    .then(hashedCVC => {
      const card = new FixerCard({
        cardNumber: cardNumber,
        expiryDate: expiryDate,
        CVC: hashedCVC,
        creatorOfCard: creatorOfCard 
      });
      hashedCvc = hashedCVC;
      return card.save()
    })
    .then(result => {
      return Fixer.findById(creatorOfCard);
    })
    .then(fixer => {
      creator = fixer;
      fixer.cards.push({
        cardNumber,
        expiryDate,
        hashedCvc
      });
      return fixer.save();
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

exports.getFixerCards = (req, res, next) => {

  const creatorOfCard = req.body.creatorOfCard;

  Fixer.findById(creatorOfCard).then(result => {
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
