/* boilerplate code to get started */
require('dotenv').config()
const express = require('express')
const axios = require('axios')
const path = require('path')
const logger = require('morgan')
const exphbs = require('express-handlebars')

// establishing the I/O port
const PORT = process.env.PORT || 3000
const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views')) // specify that templates will live in the "views" directory
app.engine('.hbs', exphbs({extname: '.hbs'}))
app.set('view engine', '.hbs') // specify that we are using "handlebars" as our template engine

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

/* run "npm start" or "node index.js" from the command line to start the express server */
app.listen(PORT, () => console.log(`App is up and running listening on port ${PORT}`))
/* end of boilerplate code */

// route handler for GET request to home ("/") route
app.get('/', (req, res, next) => {
  // "render" the template named "home.hbs" in your views folder
  res.render('home')
})

app.get('/search', (req, res, next) => {
  console.log('**** inside route handler for /search ****')
  // get search term sent from frontend
  // grab the "q" parameter sent from the frontend
  const term = req.query.q

  giphySearch(term)
    .then((results) => {
      // send JSON back to the frontend using `res.json()`
      // don't forget return keyword
      return res.json({ gifs: results })
    })
    .catch((error) => {
      console.log(error)
    })
})

// function responsible for making API call to Giphy
// from your server
function giphySearch (searchTerm) {
  const url = 'https://api.giphy.com/v1/gifs/search'
  const apiKey = '[ADD YOUR GIPHY API KEY HERE]'

  // don't forget the "return" keyword in front of axios
  return axios.get(url, {
    params: {
      q: searchTerm,
      api_key: apiKey
    }
  }).then((response) => {
    return response.data.data
  }).catch((error) => {
    console.log(error)
  })
}
