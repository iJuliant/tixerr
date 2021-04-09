const helper = require('../../helpers/wrapper')
const movieModel = require('./movie_model')

module.exports = {
  sayHello: (req, res) => {
    res.status(200).send('Hello World')
  },
  getAllMovie: async (req, res) => {
    try {
      let { page, limit } = req.query
      page = +page
      limit = +limit
      const totalData = await movieModel.getCountData()

      const totalPage = Math.ceil(totalData / limit)
      console.log(limit)
      const offset = page * limit - limit
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData
      }
      const result = await movieModel.getDataAll(limit, offset)
      return helper.response(res, 200, 'Success Get Data', result, pageInfo)
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
      return helper.response(res, 200, 'Success Creating Data', result)
    } catch {
      return helper.response(res, 400, 'Bad Request', Error)
    }
  },
  updateMovie: async (req, res) => {
    try {
      const { id } = req.params
      const { title, category, releaseDate } = req.body
      const setData = {
        title: title,
        category: category,
        release_date: releaseDate,
        updated_at: new Date(Date.now())
      }
      const result = await movieModel.updateMovie(setData, id)
      return helper.response(res, 200, `Success Updating data ${result.title}`)
      // console.log(req.params)
      // console.log(req.body)
    } catch {
      return helper.response(res, 400, 'Bad Request', Error)
    }
  },
  deleteMovie: async (req, res) => {
    // try {
    //   // const { id } = req.params
    //   // const { title, category, releaseDate } = req.body
    //   // const setData = {
    //   //   title: title,
    //   //   category: category,
    //   //   release_date: releaseDate
    //   }
    // } catch {
    //   return helper.response(res, 400, 'Bad Request', Error)
    // }
  }
}
