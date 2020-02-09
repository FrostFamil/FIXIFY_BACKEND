const express = require('express');
const { body } = require('express-validator/check');

const User = require('../models/user');
const Fixer = require('../models/fixer');
const Request = require('../models/request');

const requestController = require('../controllers/requests');

const router = express.Router();

router.post('/makeRequest', requestController.addUsersRequest);
router.post('/getPendingRequest', requestController.getAllPendingRequests);
router.post('/getAcceptedRequest', requestController.getAllAcceptedRequests);
router.post('/getFinishedRequest', requestController.getAllFinishedRequests);
router.post('/fixerGetAllRelatedRequest', requestController.fixerGetRelatedRequests);
router.post('/fixerFinishRequest', requestController.fixerFinishRequest);
router.post('/getAllHistoriesOfFixer', requestController.fixerGetFinishedRequests)
router.post('/acceptRequest', requestController.fixerAcceptRequest);
router.post('/seeRequest', requestController.fixerSeeRequest);
router.post('/userFindHisRequest', requestController.userFindHisCurrentRequest);
router.post('/userSeeFixer', requestController.userSeeFixerOnMap);
//router.post('/cancelCurrentrequest', requestController.userCancelCurrentRequest);

module.exports = router;
