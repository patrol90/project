var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name:  {
        type: String,
        required: true,
    },
    login:  {
        type: String,
        required: true,
        unique: true,
        index: { unique: true }
    },
    password:  {
        type: String,
        required: true,
    },
    email:  {
        type: String,
        required: true,
    },
    phone:   {
        type: String,
        required: true,
    },
    type:  {
        type: String,
        required: true,
        enum: ['client', 'station'],
    },
    tickets: {
        type: [Schema.Types.ObjectId],
        ref: 'Ticket',
    },
    station: Schema.Types.ObjectId,
});


module.exports = mongoose.model('User', UserSchema);
