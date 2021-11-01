const Testimony = require('../models/testimony')

const testimonyController = {
    create: async (req, res) => {
        try {
            const testimony = new Testimony(req.body)
            await testimony.save()
            res.status(201).json(testimony)
        } catch (error) {
            res.status(400).json({ message: 'Bad Request' })
        }
    },
    readAll: async (req, res) => {
        try {
            
            const testimonies = await Testimony.find({})
            res.status(200).json(testimonies)
        } catch (error) {
            res.status(400).json({ message: 'Bad Request' })
        }
    },
    readOne: async (req, res) => {
        try {
            const { id } = req.params
            const testimony = await Testimony.findById(id)
            res.status(200).json(testimony)
        } catch (error) {
            res.status(400).json({ message: 'Bad Request' })
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params
            const response = {}

            await Testimony.findByIdAndUpdate(
                id,
                req.body,
                { new: true },
                (err, updatedtestimony) => {
                    Object.assign(response, { updatedtestimony: updatedtestimony, success: true })
                    err ? res.status(500).send(err) : res.status(200).json(response)
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

            await Testimony.findByIdAndDelete(id, err => {
                Object.assign(response, { testimony: 1, success: true })
                err ? res.status(500).send(err) : res.status(200).json(response)
            })
        } catch (error) {
            res.status(400).json({ message: 'Bad Request' })
        }
    }
}

module.exports = testimonyController