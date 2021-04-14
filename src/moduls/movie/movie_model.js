const connection = require('../../config/mysql')

module.exports = {
  getDataAll: (limit, offset) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM movie LIMIT ? OFFSET ?', [limit, offset], (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },
  getCountData: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT COUNT(*) AS total FROM movie', (error, result) => {
        !error ? resolve(result[0].total) : reject(new Error(error))
      })
    })
  },
  searchMovie: (like, orderBy) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM movie WHERE movie_title LIKE '%${like}%' ORDER BY movie_title ${orderBy}`, like, (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },
  getMovieById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM movie WHERE movie_id = ?', id, (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },
  createMovie: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO movie SET ?', setData, (error, result) => {
        !error ? resolve({ movie_id: result.insertId, ...setData }) : reject(new Error(error))
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
  updateMovie: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE movie SET ? WHERE movie_id = ?', [setData, id], (error, result) => {
        !error ? resolve({ id, ...setData }) : reject(new Error(error))
      })
    })
  },
  deleteMovie: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM movie WHERE movie_id = ?', id, (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  }
}
