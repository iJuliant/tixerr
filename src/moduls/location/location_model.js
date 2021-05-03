const connection = require('../../config/mysql')

module.exports = {
  getDataAll: (limit, offset) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM location LIMIT ? OFFSET ?', [limit, offset], (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },
  getCountData: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT COUNT(*) AS total FROM location', (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },
  getLocationById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM location WHERE location_id = ?', id, (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },
  postLocation: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO location SET ?', setData, (error, result) => {
        !error ? resolve({ location_id: result.insertId, ...setData }) : reject(new Error(error))
      })
    })
  },
  updateLocation: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE location SET ? WHERE location_id = ?',
        [setData, id], (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  deleteLocation: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM location WHERE location_id', id, (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  }
}
