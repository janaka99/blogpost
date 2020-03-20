var Comment  = require("../models/comment")
var Post     = require('../models/post')

module.exports = {
    isLoggedIn: function(req,res,next){
        if(req.isAuthenticated()){
            return next()
        }
        res.redirect('/login')
    },
    checkUserPost: function(req,res,next){
        if(req.isAuthenticated()){
            Post.findById(req.params.id, function(err, post){
                if(post.author.id.equals(req.user._id)){
                    next()
                }else{
                    console.log('bad!!!!!')
                    res,redirect('/posts/' + req.params.id)
                }
            })
        }else{
            res.redirect('/login')
        }
    },
    checkUserComment: function(req, res, next){
        console.log('you maid it')
        if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id, function(err, comment){
                if (comment.author.id.equals(req.user._id)){
                    next()
                }else{
                    res.redirect('/posts/'+ req.params.id)
                }
            })
        }else{
            res.redirect('login')
        }
    }
}