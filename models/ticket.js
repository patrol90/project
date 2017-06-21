var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TicketSchema = new Schema({
    name:    String,
    info: String,
    stations: [Schema.Types.ObjectId],
    user: Schema.Types.ObjectId,
    contacts: String,
    selectedStation: Schema.Types.ObjectId,
});

module.exports = mongoose.model('Ticket', TicketSchema);
