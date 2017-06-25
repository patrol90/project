var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var OfferSchema = new mongoose.Schema({
    ticket: {
        type: Schema.Types.ObjectId,
        ref: 'Ticket',
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    station: {
        type: Schema.Types.ObjectId,
        ref: 'Station',
        required: true,
    },
    create: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Offer', OfferSchema);
