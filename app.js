if (process.env.NODE_ENV !== "production"){
    require('dotenv').config()
}

var mongoose = require('mongoose')
var express  = require('express')
var app      = express()
var bodyParser  = require('body-parser')
var LocalStrategy = require('passport-local')
var passport    = require("passport") 
var seedDB        = require('./seeds')
var Post          = require('./models/post')
var Comment       = require('./models/comment')
var User          = require("./models/user")
var methodOverride = require('method-override')
var session        = require('express-session')
var cookieParser   = require("cookie-parser") 

//routes
var indexRouter   = require('./routes/index')
var postRouter    = require('./routes/posts')
var commentRouter = require('./routes/comments')

mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true, useUnifiedTopology:true})
app.use(bodyParser.urlencoded({extended:true}))
app.use(methodOverride("_method"))
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
// seedDB()

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});






app.use('/',indexRouter)
app.use('/posts',postRouter)
app.use('/posts/:id/comments', commentRouter)



app.listen(process.env.PORT || 3000)