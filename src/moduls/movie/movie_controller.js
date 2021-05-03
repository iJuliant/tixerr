const helper = require('../../helpers/wrapper')
const redis = require('redis')
const client = redis.createClient()
const movieModel = require('./movie_model')
const fs = require('fs')

module.exports = {
  getAllMovie: async (req, res) => {
    try {
      let { page, limit, keySearch, orderBy } = req.query
      page = page ? +page : page = 1
      limit = limit ? +limit : limit = 5
      if (!keySearch) {
        const totalData = await movieModel.getCountData()
        const totalPage = Math.ceil(totalData / limit)
        const offset = page * limit - limit
        const pageInfo = {
          page,
          totalPage,
          limit,
          totalData
        }
        const result = await movieModel.getDataAll(limit, offset)
        client.setex(`getmovie:${JSON.stringify(req.query)}`, 3600, JSON.stringify({ result, pageInfo }))
        return helper.response(res, 200, 'Success Get Data', result, pageInfo)
      } else {
        const result = await movieModel.searchMovie(keySearch, orderBy)
        if (result.length > 0) {
          return helper.response(res, 200, `Found ${result.length} data like ${keySearch}`, result)
        } else {
          return helper.response(res, 400, `Data like ${keySearch} does not exist`, null)
        }
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', Error)
    }
  },
  searchMovie: async (req, res) => {
    try {
      const { like } = req.params
      const result = await movieModel.searchMovie(like)
      console.log(like)
      if (result.length > 0) {
        return helper.response(res, 200, `Found ${result.length} data like ${like}`, result)
      } else {
        return helper.response(res, 400, `Data like ${like} not found`, null)
      }
    } catch {
      console.log(req.params)
      return helper.response(res, 400, 'Bad Request', Error)
    }
  },
  getMovieById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await movieModel.getMovieById(id)
      if (result.length > 0) {
        client.set(`getmovie:${id}`, JSON.stringify(result))
        return helper.response(res, 200, 'Success Get Data by Id', result)
      } else {
        return helper.response(res, 404, `Data ${id} not found`, null)
      }
    } catch {
      return helper.response(res, 400, 'Bad Request', Error)
    }
  },
  postMovie: async (req, res) => {
    try {
      const { title, releaseDate, duration, director, casts, synopsis } = req.body
      const setData = {
        movie_title: title,
        movie_release_date: releaseDate,
        movie_image: req.file ? req.file.filename : '',
        movie_duration: duration,
        movie_director: director,
        movie_casts: casts,
        movie_synopsis: synopsis
      }
      console.log(setData)
      const result = await movieModel.createMovie(setData)
      return helper.response(res, 200, 'Success Creating Data', result)
    } catch {
      return helper.response(res, 400, 'Bad Request', Error)
    }
  },
  updateMovie: async (req, res) => {
    try {
      console.log('process di update movie')
      console.log(req.params)
      const { id } = req.params
      const isData = await movieModel.getMovieById(id)
      const { title, releaseDate, duration, director, casts, synopsis } = req.body
      const setData = {
        movie_title: title,
        movie_release_date: releaseDate,
        movie_image: req.file ? req.file.filename : '',
        movie_duration: duration,
        movie_director: director,
        movie_casts: casts,
        movie_synopsis: synopsis,
        movie_updated_at: new Date(Date.now())
      }
      if (isData.length === 0) {
        return helper.response(res, 404, 'Cannot Update Empty Data')
      } else {
        // console.log(isData)
        const result = movieModel.updateMovie(setData, id)
        fs.unlink(`/src/uploads/${isData[0].movie_image}`, (error) => {
          if (error) {
            console.log(error)
          } else {
            console.log('no error')
          }
        })
        return helper.response(res, 200, 'Success updating movie', result)
      }
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', Error)
    }
  },
  deleteMovie: async (req, res) => {
    try {
      const { id } = req.params
      const validate = await movieModel.getMovieById(id)
      if (validate.length > 0) {
        const result = await movieModel.deleteMovie(id)
        fs.unlink(`/src/uploads/${validate[0].movie_image}`, (error) => {
          if (error) {
            console.log(error)
          } else {
            console.log('no error')
          }
        })
        return helper.response(res, 200, 'Success deleting data', result)
      } else {
        return helper.response(res, 400, `Data ${id} not found`)
      }
    } catch {
      return helper.response(res, 400, 'Bad Request', Error)
    }
  }
}
