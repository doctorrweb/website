const Comment = require('../models/comment')
const Post = require('../models/post')

const commentController = {
    create: async (req, res) => {
        try {
            const comment = new Comment(req.body)
            await comment.save()

            //Link the comment to the related post
            const post = await Post.findById(comment.post)
            await post.comments.push(comment._id)
            await post.save()

            // Send the response to the client
            res.status(201).json(comment)
        } catch (error) {
            res.status(400).json({ message: 'Bad Request' })
        }
    },
    readAll: async (req, res) => {
        try {
            const comments = await Comment.find({})
            res.status(200).json(comments)
        } catch (error) {
            res.status(400).json({ message: 'Bad Request' })
        }
    },
    readOne: async (req, res) => {
        try {
            const { id } = req.params
            const comment = await Comment.findById(id)
            res.status(200).json(comment)
        } catch (error) {
            res.status(400).json({ message: 'Bad Request' })
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params
            await Comment.findByIdAndUpdate(
                id,
                req.body,
                { new: true },
                (err, updatedComment) => {
                    err ? res.status(500).send(err) : res.status(200).send(updatedComment)
                }
            )
        } catch (error) {
            res.status(400).json({ message: 'Bad Request' })
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params
            const response = {}
            const comment = await Comment.findById(id)            

            await Comment.findByIdAndDelete(id, err => {
                err ? res.status(500).send(err) : Object.assign(response, {comment: 1})
            })


            //Delete the comment in the related post
            const post = await Post.findById(comment.post)
            const postComments = await post.comments.filter(comment => comment != id)
            post.comments = postComments
            await post.save()
            Object.assign(response, { success: true})

            res.status(200).json(response)

        } catch (error) {
            res.status(400).json({ message: 'Bad Request' })
        }
    }
}

module.exports = commentController