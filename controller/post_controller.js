const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = async (req,res) => {
    try{
        await Post.create({
            content : req.body.content,
            user: req.user._id
        })
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
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log('err:' + err);
        return;
    }
    
    
}