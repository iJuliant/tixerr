const connection = require('../../config/mysql')

module.exports = {
  getDataAll: (limit, offset) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM show_time LIMIT ? OFFSET ?', [limit, offset], (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },
  getCountData: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT COUNT(*) AS total FROM show_time', (error, result) => {
        !error ? resolve(result[0].total) : reject(new Error(error))
      })
    })
  },
  searchShows: (like, orderBy) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM show_time WHERE show_time_name_date LIKE '%${like}%' ORDER BY show_time_date ASC`, like, (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },
  getShowById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM show_time WHERE show_time_id = ?', id, (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },
  createShow: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO show_time SET ?', setData, (error, result) => {
        !error ? resolve({ show_time_id: result.insertId, ...setData }) : reject(new Error(error))
        // if (!error) {
        //   const newResult = {
        //     id: result.insertId,
        //     ...setData
        //   }
        //   console.log(newResult)
        //   resolve(newResult)
        // } else {
        //   reject(new Error(error))
        // }
      })
    })
  },
  updateShow: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE show_time SET ? WHERE show_time_id = ?', [setData, id], (error, result) => {
        !error ? resolve({ id, ...setData }) : reject(new Error(error))
      })
    })
  },
  deleteShow: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM show_time WHERE show_time_id = ?', id, (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  }
}
