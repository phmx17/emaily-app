const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient'); // import subdocument list


const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [RecipientSchema],  // create subdocument list
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    _user: { type: Schema.Types.ObjectId, ref: 'User' }, // reference to User collection; -good stuff
    dateSent: Date,
    lastResponded: Date
})

mongoose.model('surveys', surveySchema);
