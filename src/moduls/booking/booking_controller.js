const helper = require('../../helpers/wrapper')
const bookingModel = require('./booking_model')
const premiere = require('../premiere/premiere_model')

module.exports = {
  getAllBookings: async (req, res) => {
    try {
      let { page, limit, keySearch, orderBy } = req.query
      page = +page
      limit = +limit
      if (!keySearch) {
        const totalData = await bookingModel.getCountData()
        const totalPage = Math.ceil(totalData / limit)
        const offset = page * limit - limit
        const pageInfo = { page, totalPage, limit, totalData }
        const result = await bookingModel.getDataAll(limit, offset)
        return helper.response(res, 200, 'Success: Get Data', result, pageInfo)
      } else {
        const result = await bookingModel.searchBooking(keySearch, orderBy)
        if (result.length > 0) {
          return helper.response(res, 200, `Found ${result.length} data`, result)
        } else {
          return helper.response(res, 404, `Data contains ${keySearch} not found`)
        }
      }
    } catch {
      return helper.response(res, 400, 'Bad Request', Error)
    }
  },
  getBookingById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await bookingModel.getBookingById(id)
      if (result.length > 0) {
        return helper.response(res, 200, `Success: Get Data ID ${id}`, result)
      } else {
        return helper.response(res, 404, `Error: Data ID ${id} Doesn't Exist`, null)
      }
    } catch {
      return helper.response(res, 200, 'Success: Creating Data')
    }
  },
  postBooking: async (req, res) => {
    try {
      let { premiereId, ticket, paymentMethod, status, seatLocation } = req.body
      // const seatLocation = req.body.seatLocation
      // const getPrice = premiere.getPremiereById(premiereId)
      // console.log(getPrice)
      // const seedToBooking = {
      //   premiere_id: premiereId,
      //   booking_ticket: ticket,
      //   booking_totalPrice: getPrice[0].premiere_price * ticket,
      //   booking_payment_method: paymentMethod,
      //   booking_status: status
      // }
      // const result = await bookingModel.postBooking(seedToBooking)
      for (const i in seatLocation) {
        setData {
          bookingId: 0
          booking_seat_location: seatLocation[i]
        }
      }

      // return helper.response(res, 200, 'Success Posting Data', result)
    } catch {
      return helper.response(res, 400, 'Bad Request', Error)
    }
  }
}
