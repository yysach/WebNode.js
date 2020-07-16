const mongoose = require('mongoose');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs')



// load user model
const User = require('../models/User');

module.exports=function(passport){
    passport.use()
}