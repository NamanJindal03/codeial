const User = require('../models/user');
module.exports.profile = (req,res)=>{
    //console.log(req.cookies);
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err, user){
            if(user){
                return res.render('profile.ejs', {
                    title: "User Profile",
                    user: user
                })
            }
            return res.redirect('/users/sign-in');
        });
    }else{
        res.redirect('/users/sign-in');
    }
}

module.exports.feed = (req,res) => res.render('feed.ejs');
module.exports.signIn = (req,res) => res.render('user_sign_in.ejs');
module.exports.signUp = (req,res) => res.render('user_sign_up.ejs');

module.exports.create = (req,res) =>{
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err,user){
        if(err){
            console.log(`There is an error in finding user in db`);
            return res.redirect;
        }
        if(!user){
            User.create(req.body, function(err,user){
                if(err){
                    console.log("error in creating user");
                    return;
                }
                return res.redirect('/users/sign-in');
            })
        }else{
            console.log('user already created ');
            return res.redirect('back');
        }

    })
}

module.exports.createSession = (req,res) =>{
    User.findOne({email: req.body.email}, function(err,user){
        if(err){
            console.log(`There is an error in finding user in db`);
            return res.redirect;
        }
        if(user){
            console.log(user.password);
            console.log(req.body.password);
            if(user.password != req.body.password){
                console.log('passowrd invalid');
                return res.redirect('back');
            }
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
        }else{
            console.log('user not present');
            return res.redirect('back');
        }

    })
}
module.exports.signOut = (req,res) =>{
    res.clearCookie("user_id");
    return res.redirect('/users/sign-in');
}