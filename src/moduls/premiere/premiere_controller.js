const helper = require('../../helpers/wrapper')
const premiereModel = require('./premiere_model')

module.exports = {
  sayHello: (req, res) => {
    res.status(200).send('Hello World')
  },
  getAllPremiere: async (req, res) => {
    try {
      let { page, limit, keySearch, orderBy } = req.query
      page = +page
      limit = +limit
      if (!keySearch) {
        const totalData = await premiereModel.getCountData()
        const totalPage = Math.ceil(totalData / limit)
        const offset = page * limit - limit
        const pageInfo = { page, totalPage, limit, totalData }
        const result = await premiereModel.getDataAll(limit, offset)
        return helper.response(res, 200, 'Success Get Data', result, pageInfo)
      } else {
        const result = await premiereModel.searchPremiere(keySearch, orderBy)
        if (result.length > 0) {
          return helper.response(res, 200, `Found ${result.length} data like ${keySearch}`, result)
        } else {
          return helper.response(res, 400, `Data like ${keySearch} does not exist`)
        }
      }
    } catch (error) {
      const { page, limit, keySearch, orderBy } = req.query
      console.log(page, limit, keySearch, orderBy)
      return helper.response(res, 400, 'Bad Request', Error)
    }
  },
  searchPremiere: async (req, res) => {
    try {
      const { like } = req.params
      const result = await premiereModel.searchPremiere(like)
      if (result.length > 0) {
        return helper.response(res, 200, `Found ${result.length} data like ${like}`, result)
      } else {
        return helper.response(res, 400, `Data like ${like} not found`, null)
      }
    } catch {
      return helper.response(res, 400, 'Bad Request', Error)
    }
  },
  getPremiereById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await premiereModel.getPremiereById(id)
      if (result.length > 0) {
        console.log(result[0].premiere_price)
        return helper.response(res, 200, 'Success Get Premiere By Id', result)
      } else {
        return helper.response(res, 400, 'Bad Request', `Data id ${id} not found`, null)
      }
    } catch {
      return helper.response(res, 400, 'Bad Request', Error)
    }
  },
  postPremiere: async (req, res) => {
    try {
      const { movieId, locationId, premiereName, premierePrice } = req.body
      const setData = {
        movie_id: movieId,
        location_id: locationId,
        premiere_name: premiereName,
        premiere_price: premierePrice
      }
      const result = await premiereModel.createPremiere(setData)
      return helper.response(res, 200, 'Success Creating New Premiere', result)
    } catch {
      return helper.response(res, 400, 'Bad Request', Error)
    }
  },
  updatePremiere: async (req, res) => {
    try {
      const { id } = req.params
      const isData = await premiereModel.getPremiereById(id)
      const { movieId, locationId, premiereName, premierePrice } = req.body
      const setData = {
        movie_id: movieId,
        location_id: locationId,
        premiere_name: premiereName,
        premiere_price: premierePrice,
        premiere_updated_at: new Date(Date.now())
      }
      if (isData.length > 0) {
        const result = await premiereModel.updatePremiere(setData, id)
        return helper.response(res, 200, 'Success Updating Data', result)
      } else {
        return helper.response(res, 404, 'Cannot Update Empty Data', null)
      }
    } catch {
      return helper.response(res, 400, 'Bad Request', Error)
    }
  },
  deletePremiere: async (req, res) => {
    try {
      const { id } = req.params
      const validate = await premiereModel.getPremiereById(id)
      if (validate.length > 0) {
        const result = await premiereModel.deletePremirere(id)
        return helper.response(res, 200, 'Success Deleting Data', result)
      } else {
        return helper.response(res, 400, `Data ${id} not found`)
      }
    } catch {
      return helper.response(res, 400, 'Bad Request', Error)
    }
  }
}
