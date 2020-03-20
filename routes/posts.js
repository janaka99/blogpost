var express = require('express')
var router  = express.Router()
var Comment = require('../models/comment')
var Post    = require('../models/post')
var middleware = require('../middleware')


//INDEX - show all posts

router.get('/', function(req, res){
    //get all posts from db
    Post.find({}, function(err, allposts){
        if(err){
            console.log(err)
        }else{
            res.render("posts/index", {posts:allposts})
        }
    })
})

//CREATE - add new post to db
router.post('/',middleware.isLoggedIn, function(req, res){
    //get data from form and add to posts array
    var title = req.body.title
    var image = req.body.image
    var desc  = req.body.description
    var author = {
        id:req.user._id,
        username:req.user.username
    }
    var newPost = {title:title, image:image, description:desc, author:author}
    //create a new campground and save to db
    Post.create(newPost, function(err, newlycreated){
        if(err){
            console.log(err)
        }else{
            //redirect back to the post page
            res.redirect('/posts')
        }
    })
})

//NEW - show form to create new post
router.get('/new',middleware.isLoggedIn, function(req, res){
    res.render('posts/new')
})

//SHOW - shows more info about one post
router.get('/:id', function(req, res){
    //find the campground with provided id
    var id = req.params.id
    Post.findById(id).populate('comments').exec(function(err,foundpost){
        if(err){
            console.log(err)
        }else{
            console.log(foundpost)
            //render the show template wiht that post
            res.render('posts/show', {post:foundpost})
        }
    })
})

router.get("/:id/edit",  middleware.checkUserPost, function(req,res){
    // find the post with provided id
    Post.findById(req.params.id, function(err, foundpost){
        if(err){
            console.log(err)
        }else{
            //render the edit page with that post
            res.render('/posts/edit',{ post:foundpost})
        }
    })
})

router.put('/:id', function(req,res){
    var newData = {title:req.body.title, image:req.body.image, description:req.body.desc}
    post.findByIdAndUpdate(req.params.id, {$set:newData}, function(req,post){
        if(err){
            req.redirect('back')
        }else{
            res.redirect("/posts/" + post._id)
        }
    })
})


module.exports = router