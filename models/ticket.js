var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TicketSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    info: {
        type: String,
        required: true,
    },
    stations: [Schema.Types.ObjectId],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    contacts: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Ticket', TicketSchema);
