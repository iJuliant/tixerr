const express = require('express')
const Route = express.Router()
const movieRouter = require('../moduls/movie/movie_routes')

Route.use('/movie', movieRouter)

module.exports = Route
