var mongoose= require('mongoose');
var bcrypt= require('bcrypt-nodejs');

var adminSchema = new mongoose.Schema({
  name: {type: String, required: true},
  password: {type: String, required: true}
});

adminSchema.pre('save', function(next) {
   var admin = this;
  if (!admin.isModified('password')) return next();
 bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);
     bcrypt.hash(admin.password, salt, null, function(err, hash) {
       if (err) return next(err);
      admin.password = hash;
       next();
     });
   });
 });

/**
 * Helper method for validating admin's password.
 */
 adminSchema.methods.comparePassword = function(candidatePassword, cb) {
   bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
     if (err) return cb(err);
     cb(null, isMatch);
   });
 };

var Admin = mongoose.model('Admin',adminSchema);
module.exports = Admin;
