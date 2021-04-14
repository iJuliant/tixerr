const helper = require('../../helpers/wrapper')
const locationModel = require('./location_model')

module.exports = {
  sayHello: (req, res) => {
    console.log('location connected')
  },
  getAllLocation: async (req, res) => {
    try {
      let { page, limit, keySearch, orderBy } = req.query
      page = +page
      limit = +limit
      if (!keySearch) {
        const totalData = await locationModel.getCountData()
        const totalPage = await locationModel.getCountData()
        const offset = page * limit - limit
        const pageInfo = { page, totalPage, limit, totalData }
        const result = await locationModel.getDataAll(limit, offset)
        return helper.response(res, 200, 'Success Get Data', result, pageInfo)
      } else {
        const result = await locationModel.searchLocation(keySearch, orderBy)
        if (result.length > 0) {
          return helper.response(res, 200, `Found ${result.length} location like ${keySearch}`, result)
        } else {
          return helper.response(res, 400, `Location like ${keySearch} does not exist`, null)
        }
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', Error)
    }
  },
  searchLocation: async (req, res) => {
    try {
      const { like } = req.params
      const result = await locationModel.searchLocation(like)
      if (result.length > 0) {
        return helper.response(res, 200, `Found ${result.length} location like ${like}`, result)
      } else {
        return helper.response(res, 400, `Location like ${like} does not exist`, null)
      }
    } catch {
      return helper.response(res, 400, 'Bad Request', Error)
    }
  },
  getLocationById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await locationModel.getLocationById(id)
      if (result.length > 0) {
        return helper.response(res, 200, 'Success Get Location By Id', result)
      } else {
        return helper.response(res, 400, 'Bad Request', `Data id ${id} not found`, null)
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
      const result = await locationModel.createLocation(setData)
      return helper.response(res, 200, 'Success Creating New Location', result)
    } catch {
      return helper.response(res, 400, 'Bad Request', Error)
    }
  },
  updateLocation: async (req, res) => {
    try {
      const { id } = req.params
      const { locationCity, locationAddress } = req.body
      const setData = {
        location_city: locationCity,
        location_address: locationAddress,
        location_updated_at: new Date(Date.now())
      }
      const result = await locationModel.updateLocation(setData, id)
      return helper.response(res, 200, 'Success Updating Data', result)
    } catch {
      return helper.response(res, 400, 'Bad Request', Error)
    }
  },
  deleteLocation: async (req, res) => {
    try {
      const { id } = req.params
      const validate = await locationModel.getLocationById(id)
      if (validate.length > 0) {
        const result = await locationModel.deleteLocation(id)
        return helper.response(res, 200, 'Success Deleting Data', result)
      } else {
        return helper.response(res, 400, `Data ${id} not found`)
      }
    } catch {
      return helper.response(res, 400, 'Bad Request', Error)
    }
  }
}
