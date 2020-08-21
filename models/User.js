const mongoose = require('mongoose');
const { Schema } = mongoose;    // same as: const Schema = mongoose.Schema; //Schema is a Mongoose property

const userSchema = new Schema({
    googleId: String,
    credits: {type: Number, default: 0}
})

mongoose.model('users', userSchema); // load the schema into Mongoose collection
