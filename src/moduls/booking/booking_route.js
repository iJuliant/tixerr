const express = require('express')
const Route = express.Router()
const bookingController = require('./booking_controller')
const redisMiddleware = require('../../middleware/redis')

Route.get('/',
  redisMiddleware.getBooking,
  bookingController.getAllBookings
)

Route.get('/:id',
  redisMiddleware.getBookingByIdRedis,
  bookingController.getBookingById
)

Route.post('/',
  bookingController.postBooking
)

module.exports = Route
