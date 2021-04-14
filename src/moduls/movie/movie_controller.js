const helper = require('../../helpers/wrapper')
const movieModel = require('./movie_model')

module.exports = {
  sayHello: (req, res) => {
    res.status(200).send('Hello World')
  },
  getAllMovie: async (req, res) => {
    try {
      let { page, limit, keySearch, orderBy } = req.query
      page = +page
      limit = +limit
      if (!keySearch) {
        const totalData = await movieModel.getCountData()
        const totalPage = Math.ceil(totalData / limit)
        const offset = page * limit - limit
        const pageInfo = { page, totalPage, limit, totalData }
        const result = await movieModel.getDataAll(limit, offset)
        return helper.response(res, 200, 'Success Get Data', result, pageInfo)
      } else {
        const result = await movieModel.searchMovie(keySearch, orderBy)
        if (result.length > 0) {
          return helper.response(res, 200, `Found ${result.length} data like ${keySearch}`, result)
        } else {
          return helper.response(res, 400, `Data like ${keySearch} does not exist`, null)
        }
      }
      // const totalData = await movieModel.getCountData()

      // const totalPage = Math.ceil(totalData / limit)
      // console.log(limit)
      // const offset = page * limit - limit
      // const pageInfo = {
      //   page,
      //   totalPage,
      //   limit,
      //   totalData
      // }
      // const result = await movieModel.getDataAll(limit, offset)
      // return helper.response(res, 200, 'Success Get Data', result, pageInfo)
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
        movie_title: title,
        movie_category: category,
        movie_release_date: releaseDate
      }
      const result = await movieModel.createMovie(setData)
      return helper.response(res, 200, 'Success Creating Data', result)
    } catch {
      return helper.response(res, 400, 'Bad Request', Error)
    }
  },
  updateMovie: async (req, res) => {
    try {
      const { id } = req.params
      const isData = await movieModel.getMovieById(id)
      const { title, category, releaseDate } = req.body
      const setData = {
        movie_title: title,
        movie_category: category,
        movie_release_date: releaseDate,
        movie_updated_at: new Date(Date.now())
      }
      if (isData.length === 0) {
        return helper.response(res, 404, 'Cannot Update Empty Data')
      } else {
        const result = await movieModel.updateMovie(setData, id)
        return helper.response(res, 200, 'Success Updating Data', result)
      }
    } catch {
      return helper.response(res, 400, 'Bad Request', Error)
    }
  },
  deleteMovie: async (req, res) => {
    try {
      const { id } = req.params
      const validate = await movieModel.getMovieById(id)
      if (validate.length > 0) {
        const result = await movieModel.deleteMovie(id)
        return helper.response(res, 200, 'Success deleting data', result)
      } else {
        return helper.response(res, 400, `Data ${id} not found`)
      }
    } catch {
      return helper.response(res, 400, 'Bad Request', Error)
    }
  }
}
