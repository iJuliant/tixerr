const express = require('express')
const Route = express.Router()
const premiereController = require('./premiere_controller')
const redisMiddleware = require('../../middleware/redis')
const authMiddleware = require('../../middleware/auth')

Route.get(
  '/',
  redisMiddleware.getPremiere,
  premiereController.getAllPremiere)

Route.get(
  '/:id',
  redisMiddleware.getPremiereByIdRedis,
  premiereController.getPremiereById)

Route.get('/search/:like',
  premiereController.searchPremiere)

Route.post('/',
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  premiereController.postPremiere)

Route.patch('/:id',
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  premiereController.updatePremiere)

Route.delete('/:id',
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  premiereController.deletePremiere)

module.exports = Route
