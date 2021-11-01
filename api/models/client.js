const mongoose = require('mongoose')
const { Schema } = mongoose
const Project = require('../models/project')

const ClientSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: Schema.Types.ObjectId,
        ref: 'image',
    },
    description: {
        type: String,
    },
    category: {
        type: String,
        lowercase: true,
        required: true,
        enum: [
            'international',
            'company',
            'individual',
            'organisation',
            'government',
            'ngo',
            'other',
        ],
        default: 'other',
    },
    projects: [
        {
            type: Schema.Types.ObjectId,
            ref: 'project',
        },
    ],
    translations: {
        fr: {
            type: Schema.Types.ObjectId,
            ref: 'translation',
        },
        de: {
            type: Schema.Types.ObjectId,
            ref: 'translation',
        },
    },
})

ClientSchema.pre('findOneAndDelete', next => {
    Project.deleteMany({ client: this._id }, err => err ? err : next())
})

const Client = mongoose.model('client', ClientSchema)

module.exports = Client