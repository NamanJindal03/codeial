const Post = require('../models/post');
const User = require('../models/user');
module.exports.home = function(req, res){
    //console.log(req.cookies);
    //res.cookie('user_id',25);

    // Post.find({}, function(err,posts){
    //     console.log(posts);//to make sure posts are getting from our database
    //     return res.render('home',{
    //         posts: posts 
    //     });
    // })

    //populate is used fill in all details of a certain thing
    Post.find({})
    /* we can populate the  fields that we defined in the model of the post 
        in here user was populated and comments were populated
        if we did not further populate the user in comments then we wont have able to access the name of user
        if we go to comment model we can find user over there which we are populatinng here itself

        if we only populate comment then we can access comment.user, comment.post, comment.content
        if we populate the nested user in comment also then we can access comment.user.name, comment.user.email etc
        as per defined in the model
    */
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err,posts){
        User.find({}, function(err, user){
            return res.render('home',{
                posts: posts,
                all_users: user
            });
        })
        
    })
    // return res.render('home.ejs',{

    // });
}

module.exports.contact = (req,res) => res.end('<h1> Contact us page </h1>');


