

const express = require('express')

const userRouter = require('./user')
const postRouter = require('./post')
const projectRouter = require('./project')
const formationRouter = require('./formation')
const commentRouter = require('./comment')
const clientRouter = require('./client')
const imageRouter = require('./image')
const videoRouter = require('./video')
const testimonyRouter = require('./testimony')
const translationRouter = require('./translation')

const appRouter = express.Router()

appRouter.use(userRouter)
appRouter.use(postRouter)
appRouter.use(projectRouter)
appRouter.use(formationRouter)
appRouter.use(commentRouter)
appRouter.use(clientRouter)
appRouter.use(imageRouter)
appRouter.use(videoRouter)
appRouter.use(testimonyRouter)
appRouter.use(translationRouter)

module.exports = appRouter