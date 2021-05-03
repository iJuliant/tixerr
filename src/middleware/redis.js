const redis = require('redis')
const client = redis.createClient()
const helper = require('../helpers/wrapper')

module.exports = {

  // MOVIE SECTION

  getMovieByIdRedis: (req, res, next) => {
    const { id } = req.params
    client.get(`getmovie:${id}`, (error, result) => {
      if (!error && result !== null) {
        console.log('Data ada di dalam redis')
        return helper.response(
          res,
          200,
          'SUCCESS:Get data by id',
          JSON.parse(result))
      } else {
        console.log('Data tidak ada di dalam redis')
        next()
      }
    })
  },
  getMovie: (req, res, next) => {
    client.get(`getmovie:${JSON.stringify(req.query)}`, (error, result) => {
      if (!error && result !== null) {
        console.log('data ada di dalam redis')
        const newResult = JSON.parse(result)
        return helper.response(
          res,
          200,
          'SUCCESS: Get movies',
          newResult.result,
          newResult.pageInfo
        )
      } else {
        console.log('data tidak ada di dalam redis')
        next()
      }
    })
  },
  searchMovie: (req, res, next) => {
    client.get(`searchmovie:${JSON.stringify(req.query)}`,
      (error, result) => {
        if (!error) {
          console.log('data ada di dalam redis')
          const newResult = JSON.parse(result)
          return helper.response(
            res,
            200,
            'SUCCESS: Search Movie',
            newResult.result,
            newResult.pageInfo
          )
        }
      }
    )
  },
  clearDataMovieRedis: (req, res, next) => {
    client.keys('getmovie*', (_error, result) => {
      if (result.length > 0) {
        result.forEach((item) => {
          client.del(item)
        })
      }
      console.log('clear data done : next >>>')
      next()
    })
  },

  // BOOKING SECTION

  getBookingByIdRedis: (req, res, next) => {
    const { id } = req.params
    client.get(`getbooking:${id}`, (error, result) => {
      if (!error && result !== null) {
        console.log('Data ada di dalam redis')
        return helper.response(
          res,
          200,
          'SUCCESS:get data by id',
          JSON.parse(result)
        )
      } else {
        console.log('Data tidak ada di dalam redis')
        next()
      }
    })
  },
  getBooking: (req, res, next) => {
    client.get(`getbooking:${JSON.stringify(req.query)}`,
      (error, result) => {
        if (!error && result !== null) {
          console.log('Data ada di dalam redis')
          const newResult = JSON.parse(result)
          return helper.response(
            res,
            200,
            'SUCCESS: Get bookings',
            newResult.result,
            newResult.pageInfo
          )
        } else {
          console.log('data tidak ada di dalam redis')
          next()
        }
      })
  },

  // PREMIERE SECTION

  getPremiere: (req, res, next) => {
    client.get(`getpremiere:${JSON.stringify(req.query)}`,
      (error, result) => {
        if (!error && result !== null) {
          console.log('Data ada di dalam redis')
          const newResult = JSON.parse(result)
          return helper.response(
            res,
            200,
            'SUCCESS: Get premiere',
            newResult.result,
            newResult.pageInfo
          )
        } else {
          console.log('data tidak ada di dalam redis')
          next()
        }
      })
  },
  getPremiereByIdRedis: (req, res, next) => {
    const { id } = req.params
    client.get(`getpremiere:${id}`, (error, result) => {
      if (!error && result !== null) {
        console.log('Data ada di dalam redis')
        return helper.response(
          res,
          200,
          'SUCCESS:get data by id',
          JSON.parse(result)
        )
      } else {
        console.log('Data tidak ada di dalam redis')
        next()
      }
    })
  }
}
