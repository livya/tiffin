var mongoose= require('mongoose');
var bcrypt= require('bcrypt-nodejs');



//User Schema
var tiffinSchema = new mongoose.Schema({
  firstname: {type:String,required:true},
  lastname: {type:String},
  email: { type: String, unique: true, lowercase: true,required:true },
  password:{type:String , required:true},
  address: {type:String , required:true},
  mobile: {type:String , required:true},
  tiffinBarcode: {type:String},  //entered by admin manually directly in the databse
  bagBarcode: {type:String},     //entered by admin manually directly in the databse

  resetPasswordToken: String,
  resetPasswordExpires: Date ,
  contacts: [{ type: mongoose.Schema.Types.ObjectId, ref:'Contact'}]
  
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

