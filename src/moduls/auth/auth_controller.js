const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const helper = require('../../helpers/wrapper')
const authModel = require('./auth_model')
const nodemailer = require('nodemailer')
require('dotenv').config()

module.exports = {
  register: async (req, res) => {
    try {
      const { userEmail, userPassword, userName } = req.body
      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(userPassword, salt)

      const setData = {
        user_email: userEmail,
        user_password: encryptPassword,
        user_name: userName,
        user_role: 'user',
        user_status: 0
      }
      const result = await authModel.register(setData)
      // const transporter = nodemailer.createTransport({
      //   host: 'smtp.gmail.com',
      //   port: 587,
      //   secure: false,
      //   auth: {
      //     user: process.env.SMTP.EMAIL,
      //     password: process.env.SMTP.PASSWORD
      //   }
      // })
      // const mailOptions = await transporter.sendMail({
      //   from: '"Juliant from tickitz"',
      //   to: result.user_email,
      //   subject: 'Tickitz Verification',
      //   html: `<b href='localhost:4000/api/v1/auth/verification/${result.user_id}'>click me</b>`
      // })
      // await transporter.sendMail(mailOptions, function (error, info) {
      //   if (error) {
      //     console.log(error)
      //   } else {
      //     console.log('Mail sent' + info.response)
      //     return helper.response(res, 200, 'Success register user')
      //   }
      // })
      delete result.userPassword
      console.log(result)
      return helper.response(res, 200, 'SUCCESS : REGISTER', result)
    } catch (error) {
      return helper.response(res, 400, 'ERROR : BAD REQUEST', error)
    }
  },
  login: async (req, res) => {
    try {
      const { userEmail, userPassword } = req.body
      const checkEmailUser = await authModel.getDataCondition({ user_email: userEmail })
      if (checkEmailUser.length > 0) {
        const checkPassword = bcrypt.compareSync(userPassword, checkEmailUser[0].user_password)
        if (checkPassword) {
          const payLoad = checkEmailUser[0]
          delete payLoad.user_password
          const token = jwt.sign({ ...payLoad }, 'SECRETKEY', { expiresIn: '24h' })
          // console.log(token)
          const result = { ...payLoad, token }
          return helper.response(res, 200, 'SUCCESS: Logged In', result)
        } else {
          return helper.response(res, 400, 'ERROR: Password Mismatch')
        }
      } else {
        return helper.response(res, 404, 'ERROR: Email Not Registered')
      }
    } catch (error) {
      return helper.response(res, 400, 'BAD REQUEST', error)
    }
  },
  checkRole: async (req, res) => {
    try {
      // const { userEmail}
    } catch (error) {
      //
    }
  }
}
