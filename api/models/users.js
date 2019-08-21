
var mongoose = require( 'mongoose' );
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    
    required: true,
    unique:true
  },
  regId: {
    type: String,
    unique: true,
    required: true
    
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
  paid: {
    type: Boolean,
    required: true
  },
  amount: {
    type: Number,
    required: false
  },
  zone: {
    type: String,
    required: false
  },
  chapter: {
    type: String,
    required: false
  },
  category: {
    type: String,
    required: false
  },
  reference: {
    type: String,
    required: false
  },
  regDate: {
    type:Date,
    default: Date.UTC.now
  },
  hash: String,
  salt: String
});

userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.firstName,
    exp: parseInt(expiry.getTime() / 1000),
  
  }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

//payment

var paymentSchema = new mongoose.Schema({
  amount: {
    type:Number,
    required: true
  },
  reference: {
    type:String,
    required: true
  },
  cardNumber: {
    type:String,
    required: true
  },
  cardName: {
    type:String,
    required: false
  },
  paymentDate: {
    type:Date,
    default: Date.UTC.now
  },
  member: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'User' 
    }


});


mongoose.model('User', userSchema);
mongoose.model('Payment', paymentSchema);