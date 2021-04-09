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
      // const data = ['Spiderman', 'Kacau']
      return helper.response(res, 200, 'Sukses Maju Abadi PT', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', Error)
    }
  }
}
