const mongoose = require("mongoose"),
Schema = mongoose.Schema;

const TicketSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    info: {
        type: String,
        required: true,
    },
    offers: {
        type: [Schema.Types.ObjectId],
        ref: 'Offer',
    },
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
