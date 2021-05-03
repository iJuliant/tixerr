const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
const bodyParser = require('body-parser')
const routerNavigation = require('./routes')
const path = require('path')
const port = process.env.PORT || 4000
require('dotenv').config()

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(morgan('dev'))

app.use(helmet())

app.use(compression())

app.use(cors())
app.options('*', cors())

app.use('/api/v1', routerNavigation)
app.use('/api', express.static(path.join(__dirname, 'uploads')))

app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})
