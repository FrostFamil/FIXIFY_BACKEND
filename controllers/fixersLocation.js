const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator/check');

const Fixer = require('../models/fixer');
const FixerLatLng = require('../models/fixerLatLng');

exports.addFixersLoc = (req, res, next) => {
    
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    const fixerId = req.body.fixerId;

    const post = new FixerLatLng({
      latitude: latitude,
      longitude: longitude,
      creator: fixerId
    });
    post
      .save()
      .then(result => {
        res.status(201).json({
          message: 'Post created successfully!',
          postId: result._id
        });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
};

exports.updateFixersLoc = (req, res, next) => {

    const postId = req.body.postId;
    const fixerId = req.body.fixerId;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;

    FixerLatLng.findById(postId)
      .then(post => {
        if (!post) {
          const error = new Error('Could not find post.');
          error.statusCode = 404;
          throw error;
        }
        if (post.creator.toString() !== fixerId) {
          const error = new Error('Not authorized!');
          error.statusCode = 403;
          throw error;
        }
        post.latitude = latitude;
        post.longitude = longitude;
        return post.save();
      })
      .then(result => {
        res.status(200).json({ message: 'Post updated!', post: result });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
};

exports.getFixerPreviousLoc = (req, res, next) => {
  const fixerId = req.body.fixerId;

  FixerLatLng.find({creator: fixerId}).then(result => {
    return result;
  })
  .then(fixers => { 
      res.status(200).json({
        message: 'Fetched cards successfully.',
        postId: fixers[0]
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}

// exports.getFixersLoc = (req, res, next) => {

//   FixerLatLng.find().then(result => {
//     return result;
//   })
//   .then(fixers => {
//       res.status(200).json({
//         message: 'Fetched all fixers successfully.',
//         fixers: fixers
//       });
//     })
//     .catch(err => {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       next(err);
//     });
// };
