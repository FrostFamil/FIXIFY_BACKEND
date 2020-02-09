const fs = require('fs');
const { validationResult } = require('express-validator/check');

const User = require('../models/user');
const Fixer = require('../models/fixer');
const Request = require('../models/request');
const FixerLatLng = require('../models/fixerLatLng');

exports.addUsersRequest = (req, res, next) => {
    
    const latitudeFrom = req.body.latitudeFrom;
    const longitudeFrom = req.body.longitudeFrom;
    const creator = req.body.creator;
    const acceptor = req.body.acceptor;
    const price = req.body.price;
    const problem = req.body.problem;
    const serviceType = req.body.serviceType;

    const request = new Request({
        latitudeFrom: latitudeFrom,
        longitudeFrom: longitudeFrom,
        creator: creator,
        acceptor: acceptor,
        price: price,
        problem: problem,
        serviceType: serviceType
    });
    request
      .save()
      .then(result => {
        res.status(201).json({
          message: 'Request created successfully!',
          requests: result
        });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
};


exports.getAllPendingRequests = (req, res, next) => {

    const creator = req.body.creator;

    Request.find({creator: creator, status: "Not Accepted"}).then(result => {
      return result;
    })
    .then(requests => {
        res.status(200).json({
          message: 'Fetched all pending requests successfully.',
          requests: requests
        });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };

  exports.getAllAcceptedRequests = (req, res, next) => {

    const creator = req.body.creator;

    Request.find({creator: creator, status: "Accepted"}).then(result => {
      return result;
    })
    .then(requests => {
        res.status(200).json({
          message: 'Fetched all accepted requests successfully.',
          requests: requests
        });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };

  exports.getAllFinishedRequests = (req, res, next) => {

    const creator = req.body.creator;

    Request.find({creator: creator, status: "Finished"}).then(result => {
      return result;
    })
    .then(requests => {
        res.status(200).json({
          message: 'Fetched all accepted requests successfully.',
          requests: requests
        });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };

  exports.fixerGetRelatedRequests = (req, res, next) => {

    const serviceType = req.body.serviceType;

    Request.find({ serviceType: serviceType, status: "Not Accepted" }).then(result => {
      return result;
    })
    .then(requests => {
        res.status(200).json({
          message: 'Fixer fetched all related requests successfully.',
          requests: requests
        });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };



  exports.fixerAcceptRequest = (req, res, next) => {
    
    const requestIndex = req.body.requestIndex;
    const fixerId = req.body.fixerId;

    Request.findById(requestIndex)
      .then(result => {
          console.log(result);
          
          result.acceptor = fixerId;
          result.status = "Accepted";
          return result.save();
      })
      .then(result => {
        res.status(200).json({ message: 'Request Accepted', request: result });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
};

exports.fixerFinishRequest = (req, res, next) => {
    
  const requestIndex = req.body.requestIndex;

  Request.findById(requestIndex)
    .then(result => {
        console.log(result);
        
        result.status = "Finished";
        return result.save();
    })
    .then(result => {
      res.status(200).json({ message: 'Request Accepted', request: result });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.fixerGetFinishedRequests = (req, res, next) => {

  const acceptor = req.body.acceptor;

  Request.find({acceptor: acceptor, status: "Finished"}).then(result => {
    return result;
  })
  .then(requests => {
      res.status(200).json({
        message: 'Fetched all finished requests successfully.',
        requests: requests
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.fixerSeeRequest = (req, res, next) => {
    
    const requestIndex = req.body.requestIndex;

    Request.findById(requestIndex).then(result => {
        return result;
      })
      .then(request => {
          res.status(200).json({
            message: 'Fetched request successfully.',
            request: request
          });
        })
        .catch(err => {
          if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
        });
};


exports.userFindHisCurrentRequest = (req, res, next) => {
    
  const creator = req.body.creator;

  Request.find({creator: creator, available: "Yes"})
    .then(result => {

      result[0].available = "No";
      return result[0].save();
    })
    .then(result => {
      res.status(201).json({
        message: 'Request getted Successfully',
        requests: result
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.userSeeFixerOnMap = (req, res, next) => {
  const fixerId = req.body.fixerId;

  FixerLatLng.find({creator: fixerId}).then(result => {
    return result;
  })
  .then(fixers => { 
      res.status(200).json({
        message: 'Fetched fixer successfully.',
        fixer: fixers[0]
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}

/*
exports.userCancelCurrentRequest = (req, res, next) => {
  const requestId = req.body.requestId;

  Request.findByIdAndRemove(requestId)
    .then(result => {
      res.status(200).json({ message: 'Deleted post.', result: result });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};*/