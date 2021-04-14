const helper = require('../../helpers/wrapper')
const showTimeModel = require('./show_time_model')

module.exports = {
  sayHello: (req, res) => {
    res.status(200).send('Hello World')
  },
  getAllShows: async (req, res) => {
    try {
      let { page, limit, keySearch, orderBy } = req.query
      page = +page
      limit = +limit
      if (!keySearch) {
        const totalData = await showTimeModel.getCountData()
        const totalPage = Math.ceil(totalData / limit)
        const offset = page * limit - limit
        const pageInfo = { page, totalPage, limit, totalData }
        const result = await showTimeModel.getDataAll(limit, offset)
        return helper.response(res, 200, 'Success Get Data', result, pageInfo)
      } else {
        const result = await showTimeModel.searchShows(keySearch, orderBy)
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
  searchShows: async (req, res) => {
    try {
      const { like } = req.params
      const result = await showTimeModel.searchShows(like)
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
  getShowById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await showTimeModel.getShowById(id)
      if (result.length > 0) {
        return helper.response(res, 200, 'Success Get Data by Id', result)
      } else {
        return helper.response(res, 404, `Data ${id} not found`, null)
      }
    } catch {
      return helper.response(res, 400, 'Bad Request', Error)
    }
  },
  postShow: async (req, res) => {
    try {
      const { premiereId, showTimeDate, showTimeClock } = req.body
      const setData = {
        premiere_id: premiereId,
        show_time_date: showTimeDate,
        show_time_clock: showTimeClock
      }
      const result = await showTimeModel.createShow(setData)
      return helper.response(res, 200, 'Success Creating Data', result)
    } catch {
      return helper.response(res, 400, 'Bad Request', Error)
    }
  },
  updateShow: async (req, res) => {
    try {
      const { id } = req.params
      const { premiereId, showTimeDate, showTimeClock } = req.body
      const setData = {
        premiere_id: premiereId,
        show_time_date: showTimeDate,
        show_time_clock: showTimeClock
      }
      const result = await showTimeModel.updateShow(setData, id)
      return helper.response(res, 200, 'Success Updating Data', result)
      // console.log(req.params)
      // console.log(req.body)
    } catch {
      return helper.response(res, 400, 'Bad Request', Error)
    }
  },
  deleteShow: async (req, res) => {
    try {
      const { id } = req.params
      const validate = await showTimeModel.getShowById(id)
      if (validate.length > 0) {
        const result = await showTimeModel.deleteShow(id)
        return helper.response(res, 200, 'Success deleting data', result)
      } else {
        return helper.response(res, 400, `Data ${id} not found`)
      }
    } catch {
      return helper.response(res, 400, 'Bad Request', Error)
    }
  }
}
