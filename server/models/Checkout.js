var mongoose= require('mongoose');

var checkoutSchema = new mongoose.Schema({
  tiffinBarcode: String,
  bagBarcode: String
});


var Checkout = mongoose.model('Checkout',checkoutSchema);
module.exports = Checkout;
