var passport = require('passport');
var Tiffin = require('../models/Tiffin'); 
var Checkout = require('../models/Checkout'); 
var Checkin = require('../models/Checkin'); 
var Contact = require('../models/Contact');
var Admin = require('../models/Admin');  

exports.getLogin = function(req,res){

            res.render('login');
}
exports.getHome = function(req,res){

            res.render('home');
}
exports.getContact = function(req,res){

            res.render('contact');
}
exports.getAbout = function(req,res){

            res.render('about');
}
exports.getRegister = function(req,res){

            res.render('register');
}
exports.getOurMenu = function(req,res){

            res.render('menu');
}
exports.getGallery = function(req,res){

            res.render('gallery');
}
exports.getCheckout = function(req,res){

            res.render('checkout');
}
exports.getOrders = function(req,res){

            res.render('orders');
}
exports.getAdLogin = function(req,res){
   var user = new Admin
        (
          {
            name: encodeURIComponent('admin'),
            password: encodeURIComponent('12345')
          }
          );

            user.save();
            res.render('adlogin');

}



exports.postSignUp = function(req,res){
        var user = new Tiffin
        (
          {
            firstname: req.body.firstname,lastname: req.body.lastname,
            email: req.body.email, password: req.body.password,
            address: req.body.address,
            mobile: req.body.mobile,
            tiffinBarcode: req.body.firstname,
            bagBarcode: req.body.firstname
          }
          );

            user.save();

            res.render('reg.jade');
      
            }

exports.postAdLogin = function(req,res,next){
 passport.authenticate('admin-local',function(err, admin, info) {
      if (err) return next(err);
      if (!admin) {
        console.log('Admin errors');
        return res.redirect('/');
      }
      req.logIn(admin, function(err) {
        if (err) return next(err);
        console.log('Success! You are logged in.');
        res.render('admin');
 
      });
    })(req, res, next);
}
exports.postLogin = function(req,res, next){
    passport.authenticate('user-local',function(err, user, info) {
      if (err) return next(err);
      if (!user) {
        console.log('errors');
        return res.redirect('/');
      }
      req.logIn(user, function(err) {
        if (err) return next(err);
        console.log('Success! You are logged in.');
        res.render('contact');
 
      });
    })(req, res, next);
}

exports.getSignOut = function(req,res, next){
  req.logout();
  res.redirect('/');  //redirects to home page
}
exports.postCheckIn = function(req,res, next){
  var user = new Checkin
        (
          {
            tiffinBarcode: req.body.tiffinBarcode,
            bagBarcode: req.body.bagBarcode
          }
          );
          
           user.save();
           res.send('You are succesfully checked in');
      
            }
exports.postCheckOut = function(req,res, next){
  var user = new Checkout
        (
          {
            tiffinBarcode: req.body.tiffinBarcode,
            bagBarcode: req.body.bagBarcode
          }
          );

            user.save();
            res.send('You are succesfully checked out');
         }

exports.postContact = function(req,res){
  var contact1 = new Contact
        (
          {
            postedBy: Tiffin._id,
            email: req.body.email,
            subject: req.body.subject,
            message: req.body.message
          }
          );
            contact1.t_id=req.params.id;

            console.log(contact1.t_id);
           //contact1.save();
           //res.render('done');
      
           // }
            contact1.save(function(err){
                Contact.find(function(err,contacts){
                  res.render('done');
            });
        });

    }


            



