const Post = require("../models/post");
const Comment = require("../models/comment");
module.exports.create = (req,res) => {
    Post.create({
        content : req.body.content,
        user: req.user._id
    },function(err,post){
        if(err){
            console.log(err);
            return;
        }
        return res.redirect('back');
    })
}

module.exports.destroy = (req, res) => {
    Post.findById(req.params.id, function(err, post){
        //by default the id type is object, to compare these two we need both of them as string
        // mongoose by default gives us .id which is already converted in string
        if(post.user == req.user.id){
            post.remove();
            //deletes all the comments assocaited with a certain query 
            Comment.deleteMany({post: req.params.id}, function(err){
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    })
}