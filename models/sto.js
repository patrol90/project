var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var StoSchema = new mongoose.Schema({
    name:  {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    tickets: {
        type: [Schema.Types.ObjectId],
        ref: 'Ticket',
    },
    about: {
        type: String,
        required: true,
    },
    contacts:{
        type: String,
        required: true,
    },
    feedbacks: {
        type: [Schema.Types.ObjectId],
        ref: 'Feedback',
    }
});

module.exports = mongoose.model('Station', StoSchema);
