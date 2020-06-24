const Post = require("../models/post");
const Comment = require("../models/comment");
const User = require('../models/user');
module.exports.create = async (req,res) => {
    try{
        let post = await Post.create({
            content : req.body.content,
            user: req.user._id
        })
        
        if(req.xhr){
            //when we try to populate in a data that is already with us in
            //that case we should use exec populate
            // we cannot populate normally in here
            post = await post.populate('user', 'name').execPopulate();
            console.log(post);
            //req.flash('success', err);
            //post.populate('user').;
            return res.status(200).json({
                data:{
                    post:post
                },
                message: "Post created"
            });
        }
        return res.redirect('back');
    }catch(err){
        console.log('err:' + err);
        return;
    }
    
}

module.exports.destroy = async (req, res) => {
    try{
        let post = await Post.findById(req.params.id)
        //by default the id type is object, to compare these two we need both of them as string
        // mongoose by default gives us .id which is already converted in string
        if(post.user == req.user.id){
            post.remove();
            //deletes all the comments assocaited with a certain query 
            await Comment.deleteMany({post: req.params.id});

            if(req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted"
                })
            }
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log('err:' + err);
        return;
    }
    
    
}