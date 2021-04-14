const connection = require('../../config/mysql')

module.exports = {
  getDataAll: (limit, offset) => {
    return new Promise((resolve, reject) => {
      connection.query(`
      SELECT * FROM booking LIMIT ? OFFSET ?`, [limit, offset], (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },
  getCountData: () => {
    return new Promise((resolve, reject) => {
      connection.query(`
      SELECT COUNT(*) AS total FROM booking`, (error, result) => {
        !error ? resolve(result[0].total) : reject(new Error(error))
      })
    })
  },
  getBookingById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(`
      SELECT * FROM booking WHERE booking_id = ?`, id, (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },
  postBooking: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO booking SET ?', setData, (error, result) => {
        !error ? resolve({ booking_id: result.insetId, ...setData }) : reject(new Error(error))
      })
    })
  },
  postBookingSeat: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO booking_seat SET ?', setData, (error, result) => {
        !error ? resolve({ booking_id: result.insertId, ...setData }) : reject(new Error(error))
      })
    })
  }
}
