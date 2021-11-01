const Client = require('../models/client')
const Project = require('../models/project')
const Post = require('../models/post')
const Comment = require('../models/comment')
const Translation = require('../models/translation')

const clientController = {
    create: async (req, res) => {
        try {
            const client = new Client(req.body)
            await client.save()
            res.status(201).json(client)
        } catch (error) {
            res.status(400).json({ message: 'Bad Request' })
        }
    },
    readAll: async (req, res) => {
        try {
            const clients = await Client.find({})
                .populate({path: 'translations.fr', select: ['name', 'description']})
                .populate({path: 'translations.de', select: ['name', 'description']})

            res.status(200).json(clients)
        } catch (error) {
            res.status(400).json({ message: 'Bad Request' })
        }
    },
    readOne: async (req, res) => {
        try {
            const { id } = req.params
            const client = await Client.findById(id)
                .populate({path: 'translations.fr', select: ['name', 'description']})
                .populate({path: 'translations.de', select: ['name', 'description']})
                
            res.status(200).json(client)
        } catch (error) {
            res.status(400).json({ message: 'Bad Request' })
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params

            await Client.findByIdAndUpdate(
                id,
                req.body,
                { new: true },
                (err, updatedClient) => {
                    err ? res.status(500).send(err) : res.status(200).send(updatedClient) //Object.assign(response, updatedClient)
                }
            )
        } catch (error) {
            res.status(400).json({ message: 'Bad Request' })
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params
            const client = await Client.findById(id)
            const response = {}

            // Delete the Client
            await Client.findByIdAndDelete(id, err => {
                err ? res.status(500).send(err) : Object.assign(response, { client: 1 })
            })

            if (client.projects !== []) {

                // Delete projects related to the client
                await Project.deleteMany({ client: id }, (err, data) => {
                    err ? res.status(500).send(err) : Object.assign(response, { projects: data.n })
                })

                // Delete posts related to the project
                const postsOfProjects = await Post.find({ project: client.projects })
                if (postsOfProjects) {
                    const projectIdOfPosts = []
                    postsOfProjects.map(item => {
                        projectIdOfPosts.push(item.project)
                    })

                    await Post.deleteMany({ project: {$in: projectIdOfPosts} }, (err, data) => {
                        Object.assign(response, { posts: data.n })
                    })
                }

                // Delete comments related to posts related to projects linked to the client
                const commentsOfPostsOfprojects = await Comment.find({ post: postsOfProjects })
                if (commentsOfPostsOfprojects) {
                    const postId = []
                    commentsOfPostsOfprojects.map(item => {
                        postId.push(item.post)
                    })

                    await Comment.deleteMany({ post: { $in: postId} }, (err, data) => {
                        Object.assign(response, { comments: data.n, success: true })
                        err ? res.status(500).send(err) : Object.assign(response, { postsComments: data.n })
                    })
                }
            }

            if (client.translations && client.translations.fr) {
                await Translation.findByIdAndDelete(client.translations.fr, err => {
                    err ? res.status(500).send(err) : Object.assign(response, { translationfr: 1 })
                })
            }

            if (client.translations && client.translations.de) {
                await Translation.findByIdAndDelete(client.translations.de, err => {
                    err ? res.status(500).send(err) : Object.assign(response, { translationfr: 1 })
                })
            }

            res.status(200).json(response)

        } catch (error) {
            res.status(400).json({ message: 'Bad Request' })
        }
    }
}

module.exports = clientController