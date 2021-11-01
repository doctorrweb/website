const mongoose = require('mongoose')
const { Schema } = mongoose

const ProjectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    category: {
        type: String,
        lowercase: true,
        enum: [
            'graphic',
            'edition',
            'web',
            'mobile',
            'desktop',
            'undefined'
        ],
        required: true,
        default: 'undefined'
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'client',
        required: true
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    trashDate: [
        {
            type: Date
        }
    ],
    status: {
        type: String,
        lowercase: true,
        enum: [
            'waiting',
            'inprogress',
            'completed',
            'rejected'
        ],
        required: true,
        default: 'waiting'
    },
    link: {
        type: String
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'post'
        }
    ],
    testimonies: [
        {
            type: String
        }
    ],
    image: {
        type: Schema.Types.ObjectId,
        ref: 'image'
    },
    lang: {
        type: String,
        lowercase: true,
        default: 'en',
        required: true
    },
    translations: {
        fr: {
            type: Schema.Types.ObjectId,
            ref: 'translation'
        },
        de: {
            type: Schema.Types.ObjectId,
            ref: 'translation'
        }
    }
})


const Project = mongoose.model('project', ProjectSchema)

module.exports = Project