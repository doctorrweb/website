const express = require('express')
const testimonyController = require('../controllers/testimony')
require('../authentication/jwtAuth')

const passport = require('passport')

const jwtAuthentication = passport.authenticate('jwt', { session: false })

const testimonyRouter = express.Router()

testimonyRouter.route('/testimonies')
    .post(testimonyController.create)
    .get(jwtAuthentication, testimonyController.readAll)

testimonyRouter.route('/testimonies/:id')
    .get(testimonyController.readOne)
    .put(jwtAuthentication, testimonyController.update)
    .delete(jwtAuthentication, testimonyController.delete)

module.exports = testimonyRouter