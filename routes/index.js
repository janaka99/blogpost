var express = require('express')
var router  = express.Router()
var passport = require('passport')
var User     = require('../models/user')






// root route
router.get('/', function(req, res){
    res.render('landing')
})


//show register form
router.get('/register', function(req, res){
    res.render('register')
})

//handle up sign up logic
router.post('/register', function(req, res){
    var newUser = new User({username: req.body.username})
    User.register(newUser, req.body.password, function(err, user){
      if(err){
          console.log(err)
        
      } 
      passport.authenticate("local")(req, res, function(){
          res.redirect('/posts')
      }) 
    })
})

//show login form
router.get('/login', function(req, res){
    res.render('login')
})

//handling login logic 
router.post('/login', passport.authenticate('local',
    {
        successRedirect:'/posts',
        failureRedirect:"/register"
    }), function(req, res){
})

//logout route
router.get('/logout', function(req, res){
    req.logout()
    res.redirect('/posts')
})


module.exports = router