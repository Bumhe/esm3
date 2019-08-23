
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
    required: false
    
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
    default: Date.now
  }
});


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