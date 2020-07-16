const express = require('express');
const expressLayouts = require('express-ejs-layouts');// Layout support for ejs in express
const expressEjsLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
var bodyParser = require('body-parser')

const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport');

const app = express();


// passport config
require('./config/passport')(passport);

// db config
const db = require('./config/key');
const { urlencoded } = require('express');

// connect to mongo
mongoose.connect(db.MongoURL,{useNewUrlParser:true,useUnifiedTopology:true},function(err,client,field){
    if(err){
        console.log("couldn't connect to mongodb");
    }
    console.log("mongo db connected !!")
});

const PORT = process.env.PORT || 3000;

// ejs config
app.use(expressEjsLayouts);
app.set('view engine','ejs');


// body parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// express session middleware
app.use(session({
    secret: 'anything',
    resave: true,
    saveUninitialized: true
  }));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

  // connect flash
app.use(flash());

// defining global variables for succes and error message
app.use((req,res,next)=> {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    next();
})


// Routes
app.use('/',require('./routes/index'));
app.use('/user',require('./routes/user'));

app.listen(3000,"localhost",function(){
    console.log("Sever started on port"+PORT);
})