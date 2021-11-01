const express = require('express')
const videoController = require('../controllers/video')
const upload = require('../helpers/uploadHelpers')

require('../authentication/jwtAuth')

const passport = require('passport')
const jwtAuthentication = passport.authenticate('jwt', { session: false })

const videoRouter = express.Router()

videoRouter.route('/videos')
    .post(upload.array('videos', 10), videoController.create)
    .get(jwtAuthentication, videoController.readAll)

videoRouter.route('/videos/:id')
    .get(jwtAuthentication, videoController.readOne)
    .put(jwtAuthentication, videoController.update)
    .delete(jwtAuthentication, videoController.delete)

module.exports = videoRouter