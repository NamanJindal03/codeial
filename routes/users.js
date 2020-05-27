const express = require('express');
const router = express.Router();
const usersController = require('../controller/users_controllers');
console.log(usersController);
router.get('/profile', usersController.profile);
router.get('/feed', usersController.feed);
module.exports= router;