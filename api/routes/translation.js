const express = require('express')
const translationController = require('../controllers/translation')
require('../authentication/jwtAuth')

const passport = require('passport')
const jwtAuthentication = passport.authenticate('jwt', { session: false })

const translationRouter = express.Router()

translationRouter.route('/translations')
    .get(translationController.readAll)
    .post(jwtAuthentication, translationController.create)

translationRouter.route('/translations/:id')
    .get(translationController.readOne)
    .put(jwtAuthentication, translationController.update)
    .delete(jwtAuthentication, translationController.delete)


module.exports = translationRouter