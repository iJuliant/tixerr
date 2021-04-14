const express = require('express')
const Route = express.Router()
const locationController = require('./location_controller')

Route.get('/hello', (req, res) => {
  locationController.sayHello()
})

Route.get('/', locationController.getAllLocation)
Route.get('/search/:like', locationController.searchLocation)
Route.get('/:id', locationController.getLocationById)
Route.post('/', locationController.postLocation)
Route.patch('/:id', locationController.updateLocation)
Route.delete('/:id', locationController.deleteLocation)

module.exports = Route
