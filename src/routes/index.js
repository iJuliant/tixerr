const express = require('express')
const Route = express.Router()
const movieRouter = require('../moduls/movie/movie_routes')
const locationRouter = require('../moduls/location/location_routes')
const premiereRoute = require('../moduls/premiere/premiere_routes')
const showTimeRoute = require('../moduls/showTime/show_time_routes')
const bookingRoute = require('../moduls/booking/booking_routes')

Route.use('/movie', movieRouter)
Route.use('/location', locationRouter)
Route.use('/premiere', premiereRoute)
Route.use('/show-time', showTimeRoute)
// Route.use('/booking', bookingRoute)

module.exports = Route
