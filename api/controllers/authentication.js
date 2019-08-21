var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Payment = mongoose.model('Payment');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

//change password
module.exports.changePassword=function(req,res){
    var oldPassword=req.body.oldPassword;
    var newPassword=req.body.newPassword;
    var userId=req.body.userId;

    //find the user based on id
    User.findById(userId,function(err,user){

      if(err){
        res.status(200);
        res.json({message:"User Not found",ok:false})
      }
      if(user.validPassword(oldPassword)){
        user.setPassword(newPassword);

        user.save(function(err){
          
            if(err){
              res.status(200);
              res.json({message:"An error occured",ok:false})
            }

          res.status(200);
          res.json({message:"Password Changed,Please login with your new password",ok:true})
        })
      }

    });

}
module.exports.register = function(req, res) {

  var user = new User();

  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.email = req.body.email;
  user.phone=req.body.phone;
  user.gender=req.body.gender;
  user.zone=req.body.zone;
  user.chapter=req.body.chapter;
  user.category=req.body.category;
  user.paid=false;
  user.regId=req.body.regId;
  //user.setPassword(req.body.password);

  user.save(function(err) {
var msg="";
    if(err){

      if (err.name === 'MongoError' && err.code === 11000) {
        // Duplicate email
        return res.status(200).send({ succes: false, message: 'User already exist!' });
        //msg="User Already Exist";
      }
      //return res.status(500).send(err);
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

  
  var userId=req.body.userId;
  var reference=req.body.reference;
  var amount=req.body.amount;
  

  User.update(
    {_id:userId},
    {$set:{paid:true,amount:amount,reference:reference}},
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

          
          return res.status(400).json({ success: false});
        }
        if(userFound){
          if(userFound.paid){
            return res.status(200).json({ success: true,paid:true,user:userFound});
          }
          else{
            return res.status(200).json({ success: true,paid:false,user:userFound});
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






module.exports.getAllUsers = function(req, res) {
  
  User.find({},function(err,users){

    if(err){
      console.log(err);
      res.status(500);
      res.json({message:"error"});
    }
    res.json(users);
  });

};

  


