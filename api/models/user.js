const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    method: {
        type: String,
        enum: ['local', 'google', 'facebook', 'github'],
        required: true
    },
    local: {
        email: {
            type: String
        },
        password: {
            type: String
        }
    },
    surname: {
        type: String
    },
    firstname: {
        type: String
    },
    role: {
        type: String,
        lowercase: true,
        enum: [
            'suscriber',
            'manager',
            'administrator'
        ],
        required: true,
        default: 'suscriber'
    },
    pic: {
        type: String
    },
})


UserSchema.methods.isValidPassword = function(newPassword) {
    return bcrypt.compare(newPassword, this.local.password)
}

const User = mongoose.model('user', UserSchema)

module.exports = User