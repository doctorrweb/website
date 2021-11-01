const express = require('express')
const projectController = require('../controllers/project')
require('../authentication/jwtAuth')

const passport = require('passport')

const jwtAuthentication = passport.authenticate('jwt', { session: false })

const projectRouter = express.Router()

projectRouter.route('/projects')
    .get(projectController.readAll)
    .post(jwtAuthentication, projectController.create)

projectRouter.route('/projects/:id')
    .get(projectController.readOne)
    .put(jwtAuthentication, projectController.update)
    .delete(jwtAuthentication, projectController.delete)

module.exports = projectRouter    