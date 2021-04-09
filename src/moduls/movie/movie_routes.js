const express = require('express')
const Route = express.Router()
const movieController = require('./movie_controller')

Route.get('/hello', (req, res) => {
  movieController.sayHello()
})

Route.get('/', movieController.getAllMovie)

module.exports = Route
