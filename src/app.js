
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./util/geocode')
const forecast = require('./util/forecast')

const app = express()

const dir = path.join(__dirname, "../public")
app.use(express.static(dir))
app.set('view engine', 'hbs')

const viewsPath = path.join(__dirname, "../templates/views")
app.set('views', viewsPath)

const partialsPath = path.join(__dirname, "../templates/partials")
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Eric'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Eric'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Eric'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'must specify address in query string'
    })
  }

  geocode(req.query.address, (error, data1) => {
    if (error) {
      return res.send({
        error
      })
    }

    forecast(data1.long, data1.lat, (error, data2) => {
      if (error) {
        return res.send({
          error
        })
      }

      return res.send({
        city: data2.name,
        region: data2.region,
        country: data2.country,
        observation_time: data2.observation_time,
        descriptions: data2.descriptions,
        temperature: data2.temperature
      })

    })
  })

  // pass lat/long to forecast
/*
  res.send({
    location: req.query.address,
    forecast: "Cold"
  })*/
})

app.get('*', (req,res)=>{
  res.render('404')
})

// use localhost:3000 in browser

app.listen(3000, () => {
  console.log('server is up on port 3000')
})

// run with nodemon src/app.js -e js,hbs