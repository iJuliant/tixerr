const helper = require('../helpers/wrapper')
const jwt = require('jsonwebtoken')

module.exports = {
  authentication: (req, res, next) => {
    let token = req.headers.authorization
    if (token) {
      token = token.split(' ')[1]
      jwt.verify(token, 'SECRETKEY', (error, result) => {
        if (
          (error && error.name === 'JsonWebTokenError') ||
          (error && error.name === 'TokenExpiredError')
        ) {
          return helper.response(res, 403, error.message)
        } else {
          req.decodeToken = result
          next()
        }
        console.log(error)
        console.log(result)
      })
    } else {
      return helper.response(res, 403, 'You need to login first')
    }
  },
  isAdmin: (req, res, next) => {
    if (req.decodeToken.user_role !== 'admin') {
      return helper.response(res, 401, 'Unauthorized')
    } else {
      console.log('Authorization Done : to next >>>')
      next()
    }
    // + condition where only admin can access
    // if admin > next
    // else return response
  },
  isVerified: (req, res, next) => {
    if (req.decodeToken.user_status !== '0') {
      next()
    } else {
      return helper.response(res, 401, 'Harap verifikasi email terlebih dahulu')
    }
  }
}
