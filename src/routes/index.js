const express = require('express')
const Route = express.Router()
const movieRouter = require('../moduls/movie/movie_routes')
const locationRouter = require('../moduls/location/location_routes')
const bookingRouter = require('../moduls/booking/booking_route')
const premiereRoute = require('../moduls/premiere/premiere_routes')
// const showTimeRoute = require('../moduls/showTime/show_time_routes')
const authRouter = require('../moduls/auth/auth_routes')

Route.use('/movie', movieRouter)
Route.use('/location', locationRouter)
Route.use('/booking', bookingRouter)
Route.use('/premiere', premiereRoute)
// Route.use('/show-time', showTimeRoute)
Route.use('/auth', authRouter)

module.exports = Route
