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

module.exports.destroy = (req,res)=>{
    //console.log(req.params);
    Comment.findById(req.params.id, function(err,comment){
        if(comment.user == req.user.id){
            let postId = comment.post;
            comment.remove();
            Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}}, function(err, post){
                return res.redirect('back');
            })
        }
        else{
            return res.redirect('back');
        }
    })
    // Post.findById(req.params.postId, function(err, post){
    //     if(post){
    //         Comment.findById(req.params.commentId, function(err, comment){
    //             if(comment.user == req.user.id){
    //                 comment.remove();
    //                 return res.redirect('back');
    //             }
    //             else{
    //                 return res.redirect('back');
    //             }
    //         })
    //     }else{
    //         return res.redirect('back');
    //     }
    // })
}