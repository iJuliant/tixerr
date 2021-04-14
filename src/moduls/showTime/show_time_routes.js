const express = require('express')
const Route = express.Router()
const showTimeController = require('./show_time_controller')

Route.get('/hello', (req, res) => {
  showTimeController.sayHello()
})

Route.get('/', showTimeController.getAllShows)
Route.get('/:id', showTimeController.getShowById)
Route.get('/search/:like', showTimeController.searchShows)
Route.post('/', showTimeController.postShow)
Route.patch('/:id', showTimeController.updateShow)
Route.delete('/:id', showTimeController.deleteShow)

module.exports = Route
