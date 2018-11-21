const path = require("path");
const jwt = require('jsonwebtoken');
const passportJWT = require("passport-jwt");

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const userModel = require("../app/models/user");

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'top_secret';

const User            = require('../app/models/user');

module.exports = function(app, passport) {



  app.post("/register", passport.authenticate('local-register', {
        successRedirect : '/success',
        failureRedirect : '/failure',
      }));

      app.post('/login', passport.authenticate('local-login', {
              successRedirect : '/success', // redirect to the secure profile section
              failureRedirect : '/failure', // redirect back to the signup page if there is an error
          }));

  app.get("/data",function(req,res){
    console.log("data");
    res.send({status:true});
  });

  app.get("/success",function(req,res){

    console.log(req.body);
    let user = req.body.user || {};
    const body = { _id : user._id, email : user.email };
        //Sign the JWT token and populate the payload with the user email and id
        const token = jwt.sign({ user : body },'top_secret');
        //Send back the token to the user
      res.json({ token , auth:true });
  })

  app.get("/failure",function(req, res){
    res.json({auth: false});
  });

  // app.get("/profile",isLoggedIn,function(req,res){
  //   res.json({});
  // });

  app.get("/all-users", isLoggedIn, userModel.getUsers );

  app.get("/check-email", userModel.checkEmail );

  app.get("*",function(req, res){
    console.log("...............");
    res.sendFile(path.join(__dirname, "../dist/user-app/index.html"));
  });

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  console.log("Auth",req.get("Authorization"));
  if (req.get("Authorization")) {
        var authorization = req.get("Authorization").split(" ")[1],
            decoded;
            console.log(authorization);
        try {
            decoded = jwt.verify(authorization,jwtOptions.secretOrKey );
        } catch (e) {
          console.log(e);
            return res.status(401).send('unauthorized');
        }
        var userId = decoded.id;
        console.log("DB check");
        User.findOne({_id: userId},function(err,user){
          if(err) console.log(err);
          console.log(user);
          console.log("UserId:\t",userId);
          req.userId = userId;
          return next();
        });
      }
      else
        res.send("Not Authorised");
}
