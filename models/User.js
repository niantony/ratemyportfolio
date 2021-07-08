const mongoose = require('mongoose')
const { Schema } = mongoose;
mongoose.Promise = global.Promise

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 4,
        max: 40
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.models.User || mongoose.model('User', userSchema)