const Video = require('../models/video')

const videoController = {
    create: async (req, res) => {
        try {
            let videos = []

            if (req.files) {
                await req.files.map(file => {
                    const { path } = file
                    const newPath = path.slice(6, path.length)
    
                    const newFile = {
                        name: file.originalname,
                        path: newPath,
                        extension: file.mimetype,
                        creationDate: Date.now(),
                        status: 'inactive'
                    }
                    const video = new Video(newFile)
                    videos.push(newFile)
                    video.save()
                })
            }

            if (!req.files) {
                const client = new Video(req.body)
                await client.save()
            }

            res.status(200).json(videos)

        } catch (error) {
            res.status(400).json({ message: 'Bad Request' })
        }
    },
    readAll: async (req, res) => {
        try {
            const video = await Video.find({})
            res.status(200).json(video)
        } catch (error) {
            res.status(400).json({ message: 'Bad Request' })
        }
    },
    readOne: async (req, res) => {
        try {
            const { id } = req. params
            const video = await Video.findById(id)
            res.status(200).json(video)
        } catch (error) {
            res.status(400).json({ message: 'Bad Request' })
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params
            await Video.findByIdAndUpdate(
                id,
                req.body,
                { new: true },
                (err, updatedVideo) => {
                    err ? res.status(500).send(err) : res.status(200).json(updatedVideo)
                }
            )
        } catch (error) {
            res.status(400).json({ message: 'Bad Request' })
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params

            await Video.findByIdAndDelete(id, err => {
                err ? res.status(500).send(err) : res.status(200).json({ success: true })
            })
        } catch (error) {
            res.status(400).json({ message: 'Bad Request' })
        }
    }
}

module.exports = videoController