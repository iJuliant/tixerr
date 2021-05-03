const helper = require('../../helpers/wrapper')
const premiereModel = require('./premiere_model')
const redis = require('redis')
const client = redis.createClient()

module.exports = {
  getAllPremiere: async (req, res) => {
    try {
      let { page, limit } = req.params
      page = page ? +page : page = 1
      limit = limit ? +limit : limit = 5
      const offset = page * limit - limit
      const totalData = await premiereModel.getCountData()
      const totalPage = Math.ceil(totalData / limit)
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData
      }
      const result = await premiereModel.getDataAll(limit, offset)
      client.setex(`getpremiere:${JSON.stringify(req.query)}`, 3600, JSON.stringify({ result, pageInfo }))
      return helper.response(res,
        200,
        'Success get all data from premiere',
        result,
        pageInfo
      )
    } catch {
      return helper.response(res, 400, 'Bad request', Error)
    }
  },
  getPremiereById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await premiereModel.getPremiereById(id)
      client.setex(`getpremiere:${JSON.stringify(req.query)}`, 3600, JSON.stringify({ result }))
      if (result.length === 0) {
        return helper.response(res,
          404,
          `premiere id ${id} does'nt exist`,
          null
        )
      } else {
        return helper.response(res,
          200,
          'success get data premiere by id',
          result
        )
      }
    } catch {
      return helper.response(res, 400, 'bad request', Error)
    }
  },
  searchPremiere: async (req, res) => {
    try {
      const { like } = req.params
      const result = await premiereModel.searchPremiere(like)
      if (result.length > 0) {
        return helper.response(res,
          200,
          'Found',
          result
        )
      } else {
        return helper.response(res,
          404,
          `Premiere ${like} not found`)
      }
    } catch {
      return helper.response(res, 400, 'Bad request', Error)
    }
  },
  updatePremiere: async (req, res) => {
    try {
      const { id } = req.params
      const isData = await premiereModel.getPremiereById(id)
      const { movieId, location, premiereName, premierePrice } = req.body
      const setData = {
        movie_id: movieId,
        premiere_location: location,
        premiere_name: premiereName,
        premiere_price: premierePrice
      }
      if (isData.length === 0) {
        return helper.response(res,
          400,
          'Cannot update empty data')
      } else {
        const result = await premiereModel.updatePremiere(setData, id)
        return helper.response(res,
          200,
          'Success updating premiere data',
          result)
      }
    } catch {
      return helper.response(res, 400, 'Bad request', Error)
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
      const result = await premiereModel.postPremiere(setData)
      return helper.response(res, 200, 'Success creating new premiere', result)
    } catch {
      return helper.response(res, 400, 'Bad Bad Bad request', Error)
    }
  },
  deletePremiere: async (req, res) => {
    try {
      const { id } = req.params
      const validate = await premiereModel.getPremiereById(id)
      if (validate.length > 0) {
        const result = await premiereModel.deletePremiere(id)
        return helper.response(res,
          200,
          'Success deleting premiere',
          result
        )
      } else {
        return helper.response(res,
          404,
          'Data is empty')
      }
    } catch {
      return helper.response(res, 400, 'Bad request', Error)
    }
  }
}
