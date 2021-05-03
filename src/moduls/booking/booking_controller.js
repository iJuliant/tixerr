const helper = require('../../helpers/wrapper')
const redis = require('redis')
const client = redis.createClient()
const bookingModel = require('./booking_model')
const premiereModel = require('../premiere/premiere_model')

module.exports = {
  getAllBookings: async (req, res) => {
    try {
      let { page, limit } = req.query
      page = page ? +page : page = 1
      limit = limit ? +limit : limit = 5
      const totalData = await bookingModel.getCountData()
      const totalPage = Math.ceil(totalData / limit)
      const offset = page * limit - limit
      const pageInfo = {
        page, totalPage, limit, totalData
      }
      const result = await bookingModel.getDataAll(limit, offset)
      client.setex(`getbooking:${JSON.stringify(req.query)}`, 3600, JSON.stringify({ result, pageInfo }))
      return helper.response(res, 200, 'SUCCESS: GET ALL DATA', result, pageInfo)
    } catch (error) {
      return helper.response(res, 400, 'BAD REQUEST', Error)
    }
  },
  getBookingById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await bookingModel.getBookingById(id)
      if (result.length > 0) {
        client.setex(`getbooking:${JSON.stringify(req.query)}`, 3600, JSON.stringify({ result }))
        return helper.response(
          res,
          200,
          'Success get data by id',
          result
        )
      } else {
        return helper.response(
          res,
          404,
          'Error: Data not found',
          null
        )
      }
    } catch {
      return helper.response(
        res,
        400,
        'Bad request',
        Error
      )
    }
  },
  postBooking: async (req, res) => {
    try {
      const {
        premiereId, showtimeId, bookingTicket,
        bookingPaymentMethod, bookingSeatLocation
      } = req.body[0]
      const price = await premiereModel.getPremiereById(premiereId)
      const setData1 = {
        premiere_id: premiereId,
        showtime_id: showtimeId,
        booking_ticket: bookingTicket,
        booking_total_price: bookingTicket * price[0].premiere_price,
        booking_payment_method: bookingPaymentMethod,
        booking_status: 'COMPLETED'
      }
      const result1 = await bookingModel.createBooking(setData1)
      // eslint-disable-next-line array-callback-return
      const result = await bookingSeatLocation.map(el => {
        bookingModel.createBookingSeat(
          {
            booking_id: result1.booking_id,
            booking_seat_location: el
          })
      })
      return helper.response(res, 200, 'SUCCESS', [result1, result])
    } catch {
      return helper.response(res, 400, 'Bad request', Error)
    }
  }
}
