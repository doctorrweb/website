const mongoose = require('mongoose')
const { Schema } = mongoose

const CommentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    date: {
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
    fullname: {
        type: String,
        lowercase: true
    },
    email: {
        type: String,
        lowercase: true
    },
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
    },
    top: {
        type: Schema.Types.ObjectId,
        ref: 'comment'
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'post',
        required: true
    }
})

const Comment = mongoose.model('comment', CommentSchema)

module.exports = Comment