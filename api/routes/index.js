var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
var utility= require('../utilities/mailing');
// profile
router.get('api/profile', auth, ctrlProfile.profileRead);
router.get('api/user',ctrlAuth.getUserById);
router.get('api/userByRegIdOrEmail',ctrlAuth.getUser);
router.get('api/users',ctrlAuth.getAllUsers);
// authentication
router.post('api/register', ctrlAuth.register);
router.post('api/pay', ctrlAuth.pay);
router.post('api/checkStatus', ctrlAuth.paymentStatus);
router.post('api/mail', utility.sendMail);

router.post('api/login', ctrlAuth.login);
router.post('api/changePassword', ctrlAuth.changePassword);
//get users

module.exports = router;