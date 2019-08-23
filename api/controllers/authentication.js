var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
//var Payment = mongoose.model('Payment');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

//change password

module.exports.register = function(req, res) {

  
  var userl = new User();

  userl.firstName = req.body.firstName;
  userl.lastName = req.body.lastName;
  userl.email = req.body.email;
  userl.phone=req.body.phone;
  userl.gender=req.body.gender;
  userl.zone=req.body.zone;
  userl.chapter=req.body.chapter;
  userl.category=req.body.category;
  userl.amount=req.body.amount;
  userl.paid=false;
  userl.regId=req.body.regId;
  userl.save(function(err,result) {
   
var msg="";
    if(err){

      if (err.name === 'MongoError' && err.code === 11000) {
        // Duplicate email
        return res.status(200).send({ succes: false, message: 'User already exist!' });
        //msg="User Already Exist";
      }
      return res.status(500).send(err+"Error from server");
      console.log(err);
    }
    //var token;
    //var id=user._id;
    //token = user.generateJwt();
    res.status(200);
    res.json({
      message:"Registration succesful"
    });
  });

};

//payment

module.exports.pay= function(req, res) {

  
  var userId=req.body.reference;
  //var reference=req.body.reference;
  //var amount=req.body.amount;
  

  User.update(
    {reference:userId},
    {$set:{paid:true}},
    {multi:true,new:true},
    (err,updatedUser)=> {
        var msg="";
        if(err){

          
          return res.status(500).json({ success: false});
        }
        if(updatedUser){
          return res.status(200).json({ success: true,user:updatedUser});
        }
        
  });

};

module.exports.paymentStatus= (req, res)=> {

  var userEmail=req.body.userEmail;

  User.findOne(
    {email:userEmail},
    (err,userFound)=> {
        var msg="";
        if(err){

          
           res.status(400).json({ success: false});
        }
        if(userFound){
          if(userFound.paid){
             res.status(200).json({ success: true,paid:true,user:userFound});
          }
          else{
             res.status(200).json({ success: true,paid:false,user:userFound});
          }
          
        }
        
  });

};

module.exports.getUser= (req, res)=> {

  var userEmail=req.body.userEmail;
  var registrationId=req.body.regId;


  User.findOne(
    {$or:[{email:userEmail},{regId:registrationId}]},
    (err,userFound)=> {
        var msg="";
        if(err){

          
          return res.status(400).json({ success: false});
        }
        if(userFound){
          return res.status(200).json({ success: true,user:userFound});
          
        }
        else{
          return res.status(401).json({ success: false});
        }
        
  });

};



module.exports.login = function(req, res) {



  passport.authenticate('local', function(err, user, info){
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      console.log(user);
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);

};

//get user byid

module.exports.getUserById = function(req, res) {
  var userid=req.params.userId;
  
  User.findById(userid )
  .exec((err, user) => {

    if(err){res.send({ success: true})}
    
    res.status(200);
    res.json(user);
  })

};


//get user byregid

module.exports.getUserByRegId = function(req, res) {
  var regId=req.params.registrationId;
  
  User.findOne({regId:regId} )
  .exec((err, user) => {

    if(err){
      console.log("Error at het by regid");
      res.send({ success: false});
    }
    
    res.status(200);
    res.json(user);
  })

};





module.exports.getAllUsers = function(req, res) {
  
  User.find({},function(err,users){

    if(err){
      console.log(err);
      res.status(500);
      res.json({message:"error"});
    }
    res.json({users:users});
  });

};

  


