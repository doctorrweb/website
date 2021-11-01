const { Schema, model, Types: { ObjectId } } = require('mongoose')

const translationSchema = new Schema({
    title: {
        type: String
    },
    name: {
        type: String,
    },
    content: {
        type: String
    },
    description: {
        type: String
    },
    completed: {
        type: Boolean,
        default: false
    },
    relation: {
        type: String,
        lowercase: true,
        enum: [
            'post',
            'formation',
            'project',
            'client'
        ]
    },
    lang: {
        type: String,
        lowercase: true,
        enum: [ 'fr', 'de' ]
    },
    post: {
        type: ObjectId,
        ref: 'post'
    },
    formation: {
        type: ObjectId,
        ref: 'formation'
    },
    project: {
        type: ObjectId,
        ref: 'project'
    },
    client: {
        type: ObjectId,
        ref: 'client'
    },
    creationDate: {
        type: Date,
        default: Date.now(),
        required: true
    }
})

const Translation = model('translation', translationSchema)

module.exports = Translation