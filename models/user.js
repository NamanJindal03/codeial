const mongoose = require("mongoose");
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');
const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar:{
        type: String,
        default:""
    }
}, {
    timeStamps: true  
});
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //__dirname is used to get the path of the current file we are working on
        //here we are linking the current file path to .. & avatar_path and this is our destination to store our image
      cb(null, path.join(__dirname, '..', AVATAR_PATH))
    },
    filename: function (req, file, cb) {

        //there can be same name of the file that different users appens, hence we link our file name with timeStamp(which is always uniqu)
        //so that there is no problem in storage
      cb(null, file.fieldname + '-' + Date.now())
    }
  });

  //static functions 
  userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');
  userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model('User', userSchema);
module.exports = User;