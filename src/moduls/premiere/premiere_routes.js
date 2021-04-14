const express = require('express')
const Route = express.Router()
const premiereController = require('./premiere_controller')

Route.get('/hello', (req, res) => {
  premiereController.sayHello()
})

Route.get('/', premiereController.getAllPremiere)
Route.get('/:id', premiereController.getPremiereById)
Route.get('/search/:like', premiereController.searchPremiere)
Route.post('/', premiereController.postPremiere)
Route.patch('/:id', premiereController.updatePremiere)
Route.delete('/:id', premiereController.deletePremiere)

module.exports = Route
