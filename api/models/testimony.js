const mongoose = require('mongoose')
const { Schema } = mongoose

const TestimonySchema = new Schema({
    title: {
        type: String
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        lowercase: true,
        required: true,
    },
    creationDate: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    publicationDate: [
        {
            type: Date
        }
    ],
    trashDate: [
        {
            type: Date
        }
    ],
    status: {
        type: String,
        lowercase: true,
        enum: [
            'pending',
            'active',
            'trash'
        ],
        required: true,
        default: 'pending'
    }
})

const Testimony = mongoose.model('testimony', TestimonySchema)

module.exports = Testimony