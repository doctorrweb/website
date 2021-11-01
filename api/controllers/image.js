const Image = require('../models/image')


const imageController = {
    create: async (req, res) => {
        try {
            let images = []

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
                images.push(newFile)
            })

            Image.create(images, err => {
                if (err) {
                    res.status(500).json({ message: 'Something went wrong' })
                }
                res.status(200).json(images)
            })

        } catch (error) {
            res.status(400).json({ message: 'Bad Request' })
        }
    },
    readAll: async (req, res) => {
        try {
            const images = await Image.find({})
            res.status(200).json(images)
        } catch (error) {
            res.status(400).json({ message: 'Bad Request' })
        }
    },
    readOne: async (req, res) => {
        try {
            const { id } = req.params
            const image = await Image.findById(id)
            res.status(200).json(image)
        } catch (error) {
            res.status(400).json({ message: 'Bad Request' })
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params
            await Image.findByIdAndUpdate(
                id,
                req.body,
                { new: true },
                (err, updatedImage) => {
                    err ? res.status(500).send(err) : res.status(200).json(updatedImage)
                }
            )
        } catch (error) {
            res.status(400).json({ message: 'Bad Request' })
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params

            await Image.findByIdAndDelete(id, err => {
                err ? res.status(500).send(err) : res.status(200).json({ success: true })
            })

        } catch (error) {
            res.status(400).json({ message: 'Bad Request' })
        }
    }
}

module.exports = imageController