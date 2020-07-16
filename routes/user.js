const express = require('express');
const router = express.Router();
const User = require('../models/User')
// encrypt password
const bcrypt = require('bcryptjs');
const { Mongoose } = require('mongoose');
const passport = require('passport');


router.get('/login',function(req,res){
    res.render("login");
});

router.get('/register',function(req,res){
    res.render("register")
});


// handling post request
router.post('/register',(req,res)=>{
    const { name, email, password,password2} = req.body;
    let errors=[]

    // check all field available
    if(!name||!email||!password||!password2)
        errors.push({msg : "please fill in all the fields !!"});
    // check password
    if(password!==password2)
        errors.push({msg:" passwords do not match !!"})
    
    // check password length
    if(password2.length < 4)
        errors.push({msg : "password is too short !!"})

    console.log(errors);
    if(errors.length > 0){
        res.render('register',{
            errors,
            name,
            email,
            password,
            password2
        });
    }
    else{
    
        User.findOne({email : email})
        .then(user =>{
            if(user){
                //user exists
                errors.push({msg : "email is already registered !!"});
                res.render('register',{
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
                console.log('hello email already exits')
                console.log(errors);

            }
            else{
                console.log(name,email,password);
                const newUser = new User({
                    name,
                    email,
                    password
                }); 

                bcrypt.genSalt(10,(err,salt)=> 
                    bcrypt.hash(newUser.password,salt,(error,hash) =>{
                        if(error) throw error;
                        // set hashed password
                    newUser.password=hash;
                    // save user
                    // before saving printing it
                    console.log(newUser);
                    newUser.save()
                    .then(user => {
                        req.flash('success_msg',"You are now registered and can log in");
                        res.redirect('/user/login');
                    })
                    .catch(err => {
                        console.log(err);
                    })
                    
                } ));
               
            }
        });

    }
   
});

// Login handler
router.post('/login',(req,res,next) => {
    passport.authenticate('local',{
        successRedirect:'/dashboard',
        failureRedirect:'/user/login',
        failureFlash:true
    })(req,res,next);
});

router.get('/logout',(req,res)=>{
    req.logOut();
    req.flash('success_msg',"you are logged out !")
    res.redirect('/user/login');
})

module.exports = router;