const express = require('express')
const Route = express.Router()
const movieController = require('./movie_controller')
const authMiddleware = require('../../middleware/auth')
const uploadFile = require('../../middleware/uploads')
const redisMiddleware = require('../../middleware/redis')

Route.get('/hello', (req, res) => {
  movieController.sayHello()
})

Route.get(
  '/',
  redisMiddleware.getMovie,
  movieController.getAllMovie
)

Route.get('/:id',
  redisMiddleware.getMovieByIdRedis,
  movieController.getMovieById
)

Route.get('/search/:like',
  redisMiddleware.searchMovie,
  movieController.searchMovie
)

Route.post('/',
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  redisMiddleware.clearDataMovieRedis,
  uploadFile,
  movieController.postMovie
)

Route.patch('/:id',
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  redisMiddleware.clearDataMovieRedis,
  uploadFile,
  movieController.updateMovie
)

Route.delete('/:id',
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  redisMiddleware.clearDataMovieRedis,
  movieController.deleteMovie
)

module.exports = Route
