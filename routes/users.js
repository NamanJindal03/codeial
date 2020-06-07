const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersController = require('../controller/users_controllers');
console.log(usersController);
router.get('/profile',passport.checkAuthentication, usersController.profile);
router.get('/feed', usersController.feed);

router.get('/sign-in', passport.checkAuthentication2, usersController.signIn);
router.get('/sign-up', passport.checkAuthentication2, usersController.signUp);
router.post('/create', usersController.create);

//use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersController.createSession)

router.get('/sign-out', usersController.destroySession);
module.exports= router;