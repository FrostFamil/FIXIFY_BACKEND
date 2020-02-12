const Fixer = require('../models/fixer');
const fixerPushNotification = require('../models/fixerPushNotification');

exports.addFixersPushToken = (req, res, next) => {
    
    const token = req.body.token;
    const fName = req.body.fName;
    const lName = req.body.lName;
    const serviceType = req.body.serviceType;

    const fixerTokenSave = new fixerPushNotification({
      token: token,
      firstName: fName,
      lastName: lName,
      serviceType: serviceType
    });
    fixerTokenSave
      .save()
      .then(result => {
        res.status(201).json({
          message: 'Token saved successfully!',
          token: result.token
        });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
};

exports.getFixersPushToken = (req, res, next) => {
  const serviceType = req.body.serviceType;

  fixerPushNotification.find({serviceType: serviceType}).then(result => {
    return result;
  })
  .then(tokens => { 
      res.status(200).json({
        message: 'Fetched tokens successfully.',
        tokens: tokens
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}
