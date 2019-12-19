'use strict'
const express = require('express')
const controller = require('./controller')

const router = express.Router({ mergeParams: true })

//// CREATE
router.post('/users', controller.create)

//// READ
router.get('/users', controller.get)

module.exports = router
