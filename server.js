const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const morgan       = require('morgan');
const passport = require('passport');
// const _ = require("lodash");
// const jwt = require('jsonwebtoken');
//
// const passport = require("passport");
// const passportJWT = require("passport-jwt");
//
// const ExtractJwt = passportJWT.ExtractJwt;
// const JwtStrategy = passportJWT.Strategy;
//
// const port     = process.env.PORT || 8080;
//
const configDB = require('./config/database.js');
// const jwtOptions = {}
// jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// jwtOptions.secretOrKey = 'tasmanianDevil';
//
// const strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
//   console.log('payload received', jwt_payload);
//   // usually this would be a database call:
//   let user = users[_.findIndex(users, {id: jwt_payload.id})];
//   if (user) {
//     next(null, user);
//   } else {
//     next(null, false);
//   }
// });
//
// passport.use(strategy);
// app.use(passport.initialize());


mongoose.connect(configDB.url, {
  useNewUrlParser: true
});
mongoose.connection.on('error', () => {
    console.log('%s MongoDB connection error. Please make sure MongoDB is running.');
    process.exit();
});

app.use(express.static('./dist/user-app'));

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(morgan("dev"));

app.use(passport.initialize());

require('./config/passport')(passport);
require('./app/routes')(app, passport);

app.listen(3000);
