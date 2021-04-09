const helper = require('../../helpers/wrapper')
const movieModel = require('./movie_model')

module.exports = {
  sayHello: (req, res) => {
    res.status(200).send('Hello World')
  },
  getAllMovie: async (req, res) => {
    try {
      console.log('Get All Movie Works !')
      const result = await movieModel.getDataAll()
      return helper.response(res, 200, 'GET ALL MOVIE SUCCESS', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', Error)
    }
  },
  getMovieById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await movieModel.getMovieById(id)
      if (result.length > 0) {
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
      const { title, category, releaseDate } = req.body
      const setData = {
        title: title,
        category: category,
        release_date: releaseDate
      }
      const result = await movieModel.createMovie(setData)
      return helper.response(res, 200, 'Success Create Movie', result)
    } catch {
      return helper.response(res, 400, 'Bad Request', Error)
    }
  },
  updateMovie: async (req, res) => {
    try {
      console.log(req.params)
      console.log(req.body)
    } catch {
      return helper.response(res, 400, 'Bad Request', Error)
    }
  },
  deleteMovie: async (req, res) => {
    try {
      console.log(req.params)
    } catch {
      return helper.response(res, 400, 'Bad Request', Error)
    }
  }
}
