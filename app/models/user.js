const mongoose = require("mongoose");
const ObjectId = require('mongoose').Types.ObjectId;
const bcrypt   = require('bcrypt-nodejs');

const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  company:{
    type: String,
  },
  local: {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
  },
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};


const userModel = mongoose.model('users', userSchema);
module.exports = mongoose.model('users', userSchema);

module.exports.getUsers = function(req,res){
  console.log("Modela");
  userModel.find({},{"local.password":0},function(err,response){
    if(err) console.log(err);
    console.log(response);
    res.send(response);
  });
};
module.exports.checkEmail = function(req,res){

  userModel.find(
  {
    "local.email": req.query.email
  }, function (err, person){
    console.log(person);
     if (err) return handleError(err);
     if(person.length > 0){
       res.send(true);
     }
     else{
       res.send(false);
     }
  } );
};
