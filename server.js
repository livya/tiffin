var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

//Require Models
var Tiffin = require('./server/models/Tiffin');
var Checkout = require('./server/models/Checkout');
var Checkin = require('./server/models/Checkin');
var Contact = require('./server/models/Contact');



var passportConf = require('./server/config/passport');



var homeController = require('./server/controllers/home');
var userController = require('./server/controllers/user');


var app =express();

app.set('views', __dirname + '/server/views');
app.set('view engine','jade');
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});

app.use(express.static('public'));
app.use(bodyParser.json());// assuming POST: {"name":"foo","color":"red"} <-- JSON encoding
app.use(bodyParser.urlencoded({extended:true}));// assuming POST: name=foo&color=red <-- URL encoding


app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'Dabbawala',
  store: new MongoStore({ url: 'mongodb://localhost/dabbawala', autoReconnect: true })
}));

//Mongoose Connection with MongoDB
mongoose.connect('mongodb://localhost/dabbawala');
console.log('local mongodb opened');


app.get('/', homeController.getIndex);
app.get('/signout', userController.getSignOut);
app.get('/register', userController.getRegister);
app.post('/register', userController.postSignUp);
app.post('/login', userController.postLogin);
app.get('/login', userController.getLogin);
app.post('/checkin', userController.postCheckIn);
app.post('/checkout', userController.postCheckOut);
app.get('/home', userController.getHome);
app.get('/about', userController.getAbout);
app.get('/contact', userController.getContact);
app.get('/ourmenu', userController.getOurMenu);
app.get('/gallery', userController.getGallery);
app.get('/checkout', userController.getCheckout);
app.get('/orders', userController.getOrders);
app.post('/contact', userController.postContact);




app.listen(3020);
console.log("Express server is listening at port 3020");

