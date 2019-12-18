'use strict'
const sanitize = require('mongo-sanitize')
const repository = require('./repository')('users')

module.exports = {
    //// CREATE
    create: async (req, res) => {
        if (!req.body.name || !req.body.age)
            return res
                .status(400)
                .json({ message: 'Name and age are required' })

        // nOmE => Nome
        var name = sanitize(req.body.name)
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')

        var age = sanitize(req.body.age)

        try {
            var user = await repository.getOne({ name })
            if (!user) {
                var user = await repository.create({ name, age })
                user = user.ops[0]

                // RabbitMQ.publish(user)
            }
        } catch (err) {
            console.log(err)
            return res.sendStatus(500)
        }

        return res.status(200).json({ data: user })
    },

    //// READ

    get: async (req, res) => {
        try {
            var users = await repository.get()
        } catch (err) {
            console.log(err)
            return res.sendStatus(500)
        }

        return res.status(200).json(users)
    }
}
