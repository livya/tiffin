var mongoose= require('mongoose');
var bcrypt= require('bcrypt-nodejs');



//User Schema
var tiffinSchema = new mongoose.Schema({
  firstname: {type:String},
  lastname: {type:String},
  email: { type: String, unique: true, lowercase: true },
  password:{type:String},
  address: {type:String},
  mobile: {type:String},
  type: String,

  resetPasswordToken: String,
  resetPasswordExpires: Date  
});
/**
 * Password hash middleware.
 */
 tiffinSchema.pre('save', function(next) {
   var user = this;
  if (!user.isModified('password')) return next();
 bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);
     bcrypt.hash(user.password, salt, null, function(err, hash) {
       if (err) return next(err);
      user.password = hash;
       next();
     });
   });
 });

/**
 * Helper method for validating user's password.
 */
 tiffinSchema.methods.comparePassword = function(candidatePassword, cb) {
   bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
     if (err) return cb(err);
     cb(null, isMatch);
   });
 };




var Tiffin = mongoose.model('Tiffin',tiffinSchema);
module.exports = Tiffin;

