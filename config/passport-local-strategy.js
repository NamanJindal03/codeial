const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use(new LocalStrategy({
        usernameField: 'email',
        //this pass req to callback allows us to give our callback another argument req so that we can assign value of noty
        passReqToCallback: true
    },
    function(req, email, password, done){
        User.findOne({email:email}, function(err, user){
            if(err){
                req.flash('error', err);
                return done(err);
            }

            if(!user || user.password!=password){
                req.flash('error', 'invalid Username/Password');
                return done(err, false);
            }

            return done(null, user);
        })
    }
))
//serializing the user to tell which key to be kept inside the cookies
passport.serializeUser(function(user, done){
    //this automatically encrypts into cookie
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('error retriving the user');
            return done(err);
        }
        return done(null,user);
    })
});
passport.checkAuthentication = function(req, res, next){
    //.isAuthenticated is a method given by passport and it tells whether the user is authenticated or not
    // if the user is signed in then pass on the request to the next  function(controllers action)
    if(req.isAuthenticated()){
        return next();
    }
    //if the user is not signed in
    return res.redirect('/users/sign-in');
}

//prevents accessing of sign-in and sign-up page when the user is already signin 
passport.checkAuthentication2 = function(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect('back');
    }
    return next();
}
passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        //whenever a user is signed in its information is available in req.user
        //req.user contains  the current  signed in user from the session cookie and we are just sending this to locals for the views
        res.locals.user = req.user;
    }
    next(); 
}
module.exports = passport;