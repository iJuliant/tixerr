const connection = require('../../config/mysql')

module.exports = {
  getDataAll: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM movie', (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },
  getMovieById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM movie WHERE id = ?', id, (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },
  createMovie: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO movie SET ?', setData, (error, result) => {
        !error ? resolve(result.insertId) : reject(new Error(error))
      })
    })
  },
  updateMovie: (id, setData) => {
    return new Promise((resolve, reject) => {
      connection.query()
    })
  },
  deleteMovie: (id) => {
    return new Promise((resolve, reject) => {
      connection.query()
    })
  }
}
