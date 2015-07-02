var mongoose= require('mongoose');

var checkinSchema = new mongoose.Schema({
  tiffinBarcode: String,
  bagBarcode: String
});


var Checkin = mongoose.model('Checkin',checkinSchema);
module.exports = Checkin;
