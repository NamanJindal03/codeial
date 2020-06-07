const Post = require('../models/post');

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
    Post.find({}).populate('user').exec(function(err,posts){
        return res.render('home',{
            posts: posts
        });
    })
    // return res.render('home.ejs',{

    // });
}

module.exports.contact = (req,res) => res.end('<h1> Contact us page </h1>');


