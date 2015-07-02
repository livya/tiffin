var mongoose= require('mongoose');

var contactSchema = new mongoose.Schema({
  email: String,
  subject: String,
  message: String
});


var Contact = mongoose.model('Contact',contactSchema);
module.exports = Contact;
