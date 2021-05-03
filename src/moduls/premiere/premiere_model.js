const connection = require('../../config/mysql')

module.exports = {
  getDataAll: (limit, offset) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM premiere LIMIT ? OFFSET ?',
        [limit, offset], (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getCountData: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT COUNT(*) AS total FROM premiere',
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error))
        })
    })
  },
  getPremiereById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM premiere WHERE premiere_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        })
    })
  },
  searchPremiere: (like) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM premiere WHERE premiere_name LIKE ${like}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  updatePremiere: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE premiere SET ? WHERE premiere_id ?',
        [setData, id], (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  postPremiere: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO premiere SET ?', setData, (error, result) => {
        !error
          ? resolve({ premiere_id: result.insertId, ...setData })
          : reject(new Error(error)
          )
      })
    })
  },
  deletePremiere: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM premiere WHERE premiere_id = ?',
        id, (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
