const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 5000;
const expressLayouts = require('express-ejs-layouts');
const db = require("./config/mongoose");

//used for session cookie
const session = require('express-session');

const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMWare=require('./config/middleware');

//const temp = require('node')

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug:false,
    outputStyle: 'extended',
    prefix: '/css'
}))
app.use(express.urlencoded());
app.use(express.static('./assets'));
//make the uploads image path available to the broswer
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cookieParser());
app.use(expressLayouts);




app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'codeial',
    //To do change the secrt brefore deploment in production mode 
    secret: 'blahSomething',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000*60*100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function(err){
            if(err){
                console.log('the error is ' + err);  
            }
            else{
                console.log('connected succesfully');
            }
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());

app.use(customMWare.setFlash);
// use express router - a middleware
app.use('/', require('./routes/index.js'));
app.listen(port, (err)=>{
    if(err){
        console.log(`There is an error: ${err}`);
        return;
    }
    console.log(`The server is running on port: ${port}`);
})