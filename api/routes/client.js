const express = require('express')
const clientController = require('../controllers/client')
require('../authentication/jwtAuth')
const authorize = require('../authentication/authorization')

const passport = require('passport')

const jwtAuthentication = passport.authenticate('jwt', { session: false })

const clientRouter = express.Router()

clientRouter.route('/clients')
    .get(clientController.readAll)
    .post(jwtAuthentication, authorize('administrator'), clientController.create)

clientRouter.route('/clients/:id')
    .get(clientController.readOne)
    .put(jwtAuthentication, authorize('administrator'), clientController.update)
    .delete(jwtAuthentication, authorize('administrator'), clientController.delete)

module.exports = clientRouter    