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
router.get('/', (req, res) => res.send('Hello World!'));
router.get('/profile', auth, ctrlProfile.profileRead);
router.get('/user/:userId',ctrlAuth.getUserById);
router.get('/userByRegId/:registrationId',ctrlAuth.getUserByRegId);
router.get('/userByRegIdOrEmail',ctrlAuth.getUser);
router.get('/users',ctrlAuth.getAllUsers);
// authentication
router.post('/register', ctrlAuth.register);
router.put('/pay/', ctrlAuth.pay);
router.post('/checkStatus', ctrlAuth.paymentStatus);
router.post('/mail', utility.sendMail);

router.post('/login', ctrlAuth.login);
//router.post('/changePassword', ctrlAuth.changePassword);
//get users

module.exports = router;