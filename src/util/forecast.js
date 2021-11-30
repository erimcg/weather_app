const request = require('postman-request')

const forecast = (long, lat, callback) => {

  const ws_url = 'http://api.weatherstack.com/current?access_key=0fb89af92df9e7d38c98a6719cd6d1ea&query=' + lat + ',' + long + '&units=f'

  request({url: ws_url, json: true}, (error, response) => {
    if (error) {
      callback('Unable to connect to the weatherstack server', undefined)
    }
    else if (response.body.error) {
      callback('Unable to get weather for specified locale', undefined)
    }
    else {
      console.log(response.body)
      callback(undefined, {
        name: response.body.location.name,
        region: response.body.location.region,
        country: response.body.location.country,
        observation_time: response.body.current.observation_time,
        descriptions: response.body.current.weather_descriptions,
        temperature: response.body.current.temperature
      })
    }
  })
}

module.exports = forecast