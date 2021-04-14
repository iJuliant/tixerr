const express = require('express')
const Route = express.Router()
const movieController = require('./movie_controller')

Route.get('/hello', (req, res) => {
  movieController.sayHello()
})

Route.get('/', movieController.getAllMovie)
Route.get('/:id', movieController.getMovieById)
Route.get('/search/:like', movieController.searchMovie)
Route.post('/', movieController.postMovie)
Route.patch('/:id', movieController.updateMovie)
Route.delete('/:id', movieController.deleteMovie)

module.exports = Route
