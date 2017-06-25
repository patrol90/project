var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var StoSchema = new mongoose.Schema({
    name:  String,
    address: String,
    tickets: [Schema.Types.ObjectId],
    about: String,
});

module.exports = mongoose.model('Station', StoSchema);
