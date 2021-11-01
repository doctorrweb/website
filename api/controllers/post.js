const Post = require('../models/post')
const Comment = require('../models/comment')
const Project = require('../models/project')
const Formation = require('../models/formation')
const Translation = require('../models/translation')

const postController = {
    create: async (req, res) => {
        try {
            const post = new Post(req.body)
            await post.save()

            //Link the post to the related project
            if (post.project) {
                const project = await Project.findById(post.project)
                await project.posts.push(post._id)
                await project.save()
            }

            //Link the post to the related formation
            if (post.formation) {
                const formation = await Formation.findById(post.formation)
                await formation.posts.push(post._id)
                await formation.save()
            }

            res.status(201).json(post)
        } catch (error) {
            res.status(400).json({ message: 'Bad Request' })
        }
    },
    readAll: async (req, res) => {
        try {

            const posts = await Post.find({})
                .populate({ path: 'image', select: 'path' })
                .populate({ path: 'formation', select: 'title' })
                .populate({ path: 'project', select: 'title' })
                .populate({path: 'translations.fr', select: ['title', 'content']})
                .populate({path: 'translations.de', select: ['title', 'content']})

            res.status(200).json(posts)
            
        } catch (error) {
            res.status(400).json({ message: 'Bad Request' })
        }
    },
    readTranslated: async (req, res) => {
        try {

            const { id } = req.params

            const posts = await Post.find({ project: id })
                .populate({ path: 'image', select: 'path' })
                .populate({ path: 'formation', select: 'title' })
                .populate({ path: 'project', select: 'title' })
                .populate({path: 'translations.fr', select: ['title', 'content']})
                .populate({path: 'translations.de', select: ['title', 'content']})

            res.status(200).json(posts)
            
        } catch (error) {
            res.status(400).json({ message: 'Bad Request' })
        }
    },
    readOne: async (req, res) => {
        try {
            const { id } = req.params
            const post = await Post.findById(id)
                .populate({ path: 'image', select: 'path' })
                .populate({ path: 'project', select: [ 'title', 'category', 'link', 'client', 'startDate', 'endDate' ] })
                .populate({ path: 'formation', select: [ 'title', 'category', 'creationDate' ] })
                .populate({path: 'translations.fr', select: ['title', 'content']})
                .populate({path: 'translations.de', select: ['title', 'content']})
            res.status(200).json(post)
        } catch (error) {
            res.status(400).json({ message: 'Bad Request' })
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params
            const response = {}
            const post = await Post.findById(id)

            await Post.findByIdAndUpdate(
                id,
                req.body,
                { new: true },
                (err, updatedPost) => {
                    err ? res.status(500).send(err) : Object.assign(response, { post: true, updatedPost: updatedPost })
                }
            )
            
            /* 
            Handle the project update
             */
            const oldProject = await Project.findById(post.project)
            const oldFormation = await Formation.findById(post.formation)
            const newPost = await Post.findById(id) //redo this query to get the updated post

            if (req.body.relation === 'project') {

                // the previous and the new relation are 'project'
                if (post.relation === 'project') {
                    const projectPosts = await oldProject.posts.filter(post => post != id)

                    //Delete the post in the old project
                    oldProject.posts = projectPosts
                    await oldProject.save()
                    Object.assign(response, { oldPost: true })
                }

                // the previous relation is 'tutorial' and the new is 'project'
                if (post.relation === 'tutorial') {
                    const formationPosts = await oldFormation.posts.filter(formation => formation != id)

                    //Delete the post in the old tutorial
                    oldFormation.posts = formationPosts
                    await oldFormation.save()
                    Object.assign(response, { oldPost: true })
                }

                //Add the post in the new project
                const newProject = await Project.findById(newPost.project)
                await newProject.posts.push(newPost._id)
                await newProject.save()
                Object.assign(response, { newPost: true })
            }   

            if (req.body.relation === 'tutorial') {
                
                // the previous and the new relation are 'project'
                if (post.relation === 'tutorial') {
                    const formationPosts = await oldFormation.posts.filter(formation => formation != id)

                    //Delete the post in the old project
                    oldFormation.posts = formationPosts
                    await oldFormation.save()
                    Object.assign(response, { oldPost: true })
                }

                // the previous relation is 'project and the new is 'tutorial'
                if (post.relation === 'project') {
                    const projectPosts = await oldProject.posts.filter(post => post != id)

                    //Delete the post in the old project
                    oldProject.posts = projectPosts
                    await oldProject.save()
                    Object.assign(response, { oldPost: true })
                }

                //Add the post in the new project
                const newPost = await Post.findById(id) //redo this query to get the updated post
                const newFormation = await Formation.findById(newPost.formation)
                await newFormation.posts.push(newPost._id)
                await newFormation.save()
                Object.assign(response, { newPost: true })
            }

            if (req.body.relation === 'blog') {

                // the previous relation is 'project
                if (post.relation === 'project') {
                    const projectPosts = await oldProject.posts.filter(post => post != id)

                    //Delete the post in the old project
                    oldProject.posts = projectPosts
                    await oldProject.save()
                    Object.assign(response, { oldPost: true })
                }

                // the previous relation is 'tutorial
                if (post.relation === 'tutorial') {
                    const formationPosts = await oldFormation.posts.filter(formation => formation != id)

                    //Delete the post in the old project
                    oldFormation.posts = formationPosts
                    await oldFormation.save()
                    Object.assign(response, { oldPost: true })
                }

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
            const post = await Post.findById(id)

            await Post.findByIdAndDelete(id, err => {
                err ? res.status(500).send(err) : Object.assign(response, { post: 1 })
            })

            // Delete the post in the related project //
            if (post.project) {
                const project = await Project.findById(post.project)
                const projectPosts = await project.posts.filter(post => post != id)

                // Remove the post from the related project
                project.posts = projectPosts
                await project.save()
                Object.assign(response, { project: 1 })
            }

            // Delete the post in the related formation //
            if (post.formation) {
                const formation = await Formation.findById(post.formation)
                const formationPosts = await formation.posts.filter(formation => formation != id)
                // Remove the post from the related project
                formation.posts = formationPosts
                await formation.save()
                Object.assign(response, { formation: 1 })
            }

            // Delete all comments related to the article
            if (post.comments !== []) {
                await Comment.deleteMany({ post: id }, (err, data) => {
                    err ? res.status(500).send(err) : Object.assign(response, { comments: data.n })
                })
            }

            if (post.translations && post.translations.fr) {
                await Translation.findByIdAndDelete(post.translations.fr, err => {
                    err ? res.status(500).send(err) : Object.assign(response, { translationfr: 1 })
                })
            }

            if (post.translations && post.translations.de) {
                await Translation.findByIdAndDelete(post.translations.de, err => {
                    err ? res.status(500).send(err) : Object.assign(response, { translationfr: 1 })
                })
            }

            res.status(200).json(response)
            
        } catch (error) {
            res.status(400).json({ message: 'Bad Request' })
        }
    }
}

module.exports = postController