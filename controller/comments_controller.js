const Post = require("../models/post");
const Comment = require("../models/comment");
module.exports.create = (req,res) => {
    Post.findById(req.body.post, function(err, post){
        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(err, comment){
                //updating 
                post.comments.push(comment);
                //whenever we do update save is necesarry
                // this tells the db that this is the final version so please block ir
                post.save();
                res.redirect('/');
            })
        }
    })
}