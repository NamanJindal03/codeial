const Post = require("../models/post");
const Comment = require("../models/comment");
module.exports.create = async (req,res) => {
    try{
        let post = await Post.findById(req.body.post);
        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            })
            //updating 
            post.comments.push(comment);
            //whenever we do update save is necesarry
            // this tells the db that this is the final version so please block ir
            post.save();
            res.redirect('/');
        }
    }catch(err){
        console.log("err:" + err);
        return;
    }
}

module.exports.destroy = async (req,res)=>{
    //console.log(req.params);
    try{
        let comment = await Comment.findById(req.params.id);
        if(comment.user == req.user.id){
            let postId = comment.post;
            comment.remove();
            await Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}});
            return res.redirect('back');
        }
        else{
            return res.redirect('back');
        }
    }catch(err){
        console.log("err:" + err);
        return;
    }
    
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