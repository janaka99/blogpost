var express = require('express')
var router  = express.Router({mergeParams:true})
var Comment = require('../models/comment')
var Post    = require('../models/post')
var middleware = require('../middleware')





// ==================
// COMMENT ROUTEs
//=====================


router.get('/new',middleware.isLoggedIn, function(req, res){
    //find post by id
    // var id = req.params.id
    Post.findById(req.params.id, function(err, post){
        if(err){
            console.log(err)
        }else{
            res.render('comments/new',{post:post})
        }
    })
})


router.post('/', middleware.isLoggedIn,function(req, res){
    //lookup post using id
    Post.findById(req.params.id, function(err, post){
        if(err){
            console.log(err)
            res.redirect('/posts')
        }else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err)
                }else{
                    //add username and id to comment
                    comment.author.id = req.user._id
                    comment.author.username = req.user.username
                    //save comment
                    comment.save()
                    post.comments.push(comment)
                    post.save()
                    console.log(comment)
                    res.redirect('/posts/' + post._id)
                }
            })
        }
    })
})


//comment edit route
router.get("/:comment_id/edit",middleware.isLoggedIn,function(req,res){
    Comment.findById(req.params.comment_id, function(err,foundComment){
        if(err){
            res.redirect('back')
        }else{
            res.redirect("comments/edit", {post_id:req.params.id, comment:foundComment})
        }
    })
})


//Comment update route
router.put('/:comment_id', function(req,res){
    Comment.findByIdAndUpdate(req.params.commentId, req.body.comment, function(err, Comment){
        if(err){
            res.redirect('back')
        }else{
            res.redirect('/posts/' + req.params.id)
        }
    })
})


router.delete('/:commentId',middleware.isLoggedIn, function(req,res){
    Comment.findByIdAndRemove(req.params.commentId, function(err){
        if(err){
            console.log('problem')
        }else{
            res.redirect('/posts/'+ req.params.id)
        }
    })
})


module.exports = router