const Project = require('../models/project')
const Post = require('../models/post')
const Client = require('../models/client')
const Comment = require('../models/comment')
const Translation = require('../models/translation')

const projectController = {
    create: async (req, res) => {
        
        try {
            const project = new Project(req.body)
            await project.save()
            
            // Link the post to the related client
            const client = await Client.findById(project.client)
            await client.projects.push(project._id)
            await client.save()
            
            res.status(201).json(project)
        } catch (error) {
            res.status(400).json({ message: 'Bad Request' })
        }
    },
    readAll: async (req, res) => {
        try {

            const projects = await Project.find({})
                .populate({path: 'image', select: 'path'})
                .populate({path: 'client', select: ['name', 'description']})
                .populate({path: 'posts', select: ['title', 'projectStep', 'creationDate', 'translations.fr', 'translations.de']})
                .populate({path: 'translations.fr', select: ['title', 'description']})
                .populate({path: 'translations.de', select: ['title', 'description']})

            res.status(200).json(projects)
            
        } catch (error) {
            res.status(400).json({ message: 'Bad Request' })
        }
    },
    readOne: async (req, res) => {
        try {
            const { id } = req.params
            const project = await Project.findById(id)
                .populate({path: 'image', select: 'path'})
                .populate({path: 'client', select: ['name', 'description']})
                .populate({path: 'posts', select: ['title', 'projectStep', 'creationDate']})
                .populate({path: 'translations.fr', select: ['title', 'description']})
                .populate({path: 'translations.de', select: ['title', 'description']})

            res.status(200).json(project)
        } catch (error) {
            res.status(400).json({ message: 'Bad Request' })
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params
            const response = {}
            const project = await Project.findById(id)


            await Project.findByIdAndUpdate(
                id,
                req.body,
                { new: true },
                async (err, updatedProject) => {
                    err ? res.status(500).send(err) : Object.assign(response, { project: 1, updatedProject: updatedProject })//res.status(200).send(updatedProject)
                }
            )

            // Handle the client update //
            if (req.body.client !== undefined && (req.body.client !== project.client)) {

                const oldClient = await Client.findById(project.client)
                const clientProjects = await oldClient.projects.filter(project => project != id)

                //Delete the post in the old project
                oldClient.projects = clientProjects
                await oldClient.save()

                //Add the post in the new project
                const newProject = await Project.findById(id) //redo this query to get the updated project
                const newClient = await Client.findById(newProject.client)
                await newClient.projects.push(newProject._id)
                await newClient.save()
            }

            res.status(200).json(response)
        
        } catch (error) {
            res.status(400).json({ message: 'Bad Request' })
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params
            const response = {}
            const project = await Project.findById(id)   

            // Delete the project
            await Project.findByIdAndDelete(id, err => {
                err ? res.status(500).send(err) : Object.assign(response, { project: 1 })
            })

            // Delete the project in the Related client
            const client = await Client.findById(project.client)
            const clientProjects = await client.projects.filter(project => project != id)

            client.projects = clientProjects
            await client.save()
            Object.assign(response, { client: true })


            /*
            */
            if (project.posts !== []) {
    
                    
                // Delete Posts related to the project 
                await Post.deleteMany({ project: { $in: id } }, (err, data) => {
                    err ? res.status(500).send(err) : Object.assign(response, { posts: data.n })
                })
                    
    
                // Delete comments related to the posts 
                await Comment.deleteMany({ post: { $in: project.posts} }, (err, data) => {
                    err ? res.status(500).send(err) : Object.assign(response, { comments: data.n, success: true })
                })

                // Delete translations related to the posts 
                await Translation.deleteMany({ post: { $in: project.posts} }, (err, data) => {
                    err ? res.status(500).send(err) : Object.assign(response, { translations: data.n, success: true })
                })
                    
            }

            // Delete translations related to the project
            if (project.translations && project.translations.fr) {
                await Translation.findByIdAndDelete(project.translations.fr, err => {
                    err ? res.status(500).send(err) : Object.assign(response, { translationfr: 1 })
                })
            }

            if (project.translations && project.translations.de) {
                await Translation.findByIdAndDelete(project.translations.de, err => {
                    err ? res.status(500).send(err) : Object.assign(response, { translationfr: 1 })
                })
            }

            res.status(200).json(response)
            
        } catch (error) {
            res.status(400).json({ message: 'Bad Request' })
        }
    }
}

module.exports = projectController