const express = require('express')
const Route = express.Router()
const locationController = require('./location_controller')
const authMiddleware = require('../../middleware/auth')

Route.get('/hello', (req, res) => {
  locationController.sayHello()
})

Route.get('/', locationController.getDataAll)

Route.get('/:id', locationController.getLocationById)

Route.post('/',
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  locationController.postLocation
)

// Route.patch('/:id',
//   authMiddleware.authentication,
//   authMiddleware.isAdmin,
//   locationController.patchLocation
// )

// Route.delete('/:id',
//   authMiddleware.authentication,
//   authMiddleware.isAdmin,
//   locationController.deleteLocation
// )

module.exports = Route
