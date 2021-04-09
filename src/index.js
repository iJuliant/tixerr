const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
const bodyParser = require('body-parser')
const routerNavigation = require('./routes')

const port = 3000

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(morgan('dev'))

app.use(helmet())

app.use(compression())

app.use(cors())
app.options('*', cors())

app.use('/api/v1', routerNavigation)

app.post('/movie', (req, res) => {
  console.log('POST movie -->')
  console.log(req.body)
})

app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})
