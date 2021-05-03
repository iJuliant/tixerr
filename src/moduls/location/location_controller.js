const helper = require('../../helpers/wrapper')
const locationModel = require('./location_model')
const redis = require('redis')
const client = redis.createClient()

module.exports = {
  getDataAll: async (req, res) => {
    try {
      let { page, limit } = req.query
      page = page ? +page : page = 1
      limit = limit ? +limit : limit = 3
      const offset = page * limit - limit
      const totalData = await locationModel.getCountData()
      const totalPage = Math.ceil(totalData / limit)
      const pageInfo = { page, totalPage, limit, totalData }
      const result = await locationModel.getDataAll(limit, offset)
      client.setex(`getlocation:${JSON.stringify(req.query)}`, 3600, JSON.stringify({ result, pageInfo }))
      return helper.response(res, 200, 'Success get location', result)
    } catch {
      return helper.response(res, 400, 'Bad request', Error)
    }
  },
  getLocationById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await locationModel.getLocationById(id)
      if (result.length !== 0) {
        client.set(`getlocation:${id}`, JSON.stringify(result))
        return helper.response(res, 200, 'Success get data location by id', result)
      } else {
        return helper.response(res, 404, 'Data not found')
      }
    } catch {
      return helper.response(res, 400, 'Bad Request', Error)
    }
  },
  postLocation: async (req, res) => {
    try {
      const { locationCity, locationAddress } = req.body
      const setData = {
        location_city: locationCity,
        location_address: locationAddress
      }
      const result = await locationModel.postLocation(setData)
      return helper.response(res, 200, 'Success creating location', result)
    } catch {
      return helper.response(res, 400, 'Bad request', Error)
    }
  },
  updateLocation: async (req, res) => {
    try {
      const { id } = req.params
      const isData = await locationModel.getLocationById(id)
      const { locationCity, locationAddress } = req.body
      const setData = { location_city: locationCity, location_address: locationAddress }
      if (isData.length === 0) {
        return helper.response(res, 404, 'Cannot update empty data')
      } else {
        const result = await locationModel.updateLocation(setData, id)
        return helper.response(res, 200, 'Updated', result)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad request', Error)
    }
  },
  deleteLocation: async (req, res) => {
    try {
      const { id } = req.params
      const isData = await locationModel.getLocationById(id)
      if (isData.length > 0) {
        const result = await locationModel.deleteLocation(id)
        return helper.response(res, 200, 'Success Delete', result)
      } else {
        return helper.response(res, 400, 'Data not found')
      }
    } catch {
      return helper.response(res, 400, 'Bad request', Error)
    }
  }
}
