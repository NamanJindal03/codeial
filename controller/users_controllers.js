const User = require('../models/user');
module.exports.profile = (req,res)=>{
    User.findById(req.params.id, function(err, user){
        return res.render('profile.ejs',{
            profile_user: user
        });
    })
    
}
module.exports.update = (req,res) =>{
    console.log(req.user.id);
    console.log(req.params.id);
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
            return res.redirect('back');
        });
    }else{
        res.status(401).send('Unauthorized');
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
//sign in and create user
module.exports.createSession = (req, res) =>{
    req.flash('success', 'Logged in Succesfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    //this logout function is given to express by passport
    req.logout();
    req.flash('success', 'You have logged our');
    return res.redirect('/');
}