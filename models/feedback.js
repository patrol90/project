const mongoose = require("mongoose"),
Schema = mongoose.Schema;

const FeedbackSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    header: {
        type: String,
        required: true,
    },
    station: {
        type: Schema.Types.ObjectId,
        ref: 'Station',
    },
    create: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
