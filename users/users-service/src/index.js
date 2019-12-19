'use strict'

process.on('uncaughtException', function(err) {
    console.log('Uncaught Exception:', err.stack)
})

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const helmet = require('helmet')
const useragent = require('express-useragent')
const router = require('./router')

var server = null

function start_server(callback) {
    const app = express()

    app.set('trust proxy', true)

    app.use(bodyParser.json())

    app.use(morgan('dev'))
    app.use(
        helmet({
            crossdomain: false
        })
    )
    app.use(useragent.express())
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        )
        res.header(
            'Access-Control-Allow-Methods',
            'GET, POST, PUT, DELETE, OPTIONS'
        )
        next()
    })

    // api versions
    app.use('/', router)

    // RabbitMQ.subscribe('users', controller.create)

    server = app.listen(parseInt(process.env.USER_SERVER_PORT), () =>
        callback(null, server)
    )
    console.log('Listening on port ' + process.env.USER_SERVER_PORT)

    return app
}

start_server((err, app) => {
    console.log('User service initialized.')
})

// Tests
module.exports = { start_server }
