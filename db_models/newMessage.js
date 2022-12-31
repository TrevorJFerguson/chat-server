const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    dateTime: {
        type: Date,
        required: true,
        default: new Date
    }
})

module.exports = mongoose.model('Message', messageSchema)