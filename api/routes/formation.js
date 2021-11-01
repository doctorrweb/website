const express = require('express')
const formationController = require('../controllers/formation')
require('../authentication/jwtAuth')

const passport = require('passport')
const jwtAuthentication = passport.authenticate('jwt', { session: false })

const formationRouter = express.Router()

formationRouter.route('/formations')
    .get(formationController.readAll)
    .post(jwtAuthentication, formationController.create)

formationRouter.route('/formations/:id')
    .get(formationController.readOne)
    .put(jwtAuthentication, formationController.update)
    .delete(jwtAuthentication, formationController.delete)
    
module.exports = formationRouter    