const request = require('postman-request')

const geocode = (address, callback) => {
console.log('address: ' + address);
  const mapbox_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZXJpYzE5NjgiLCJhIjoiY2tic3BxaGxnMDJhejJwcnFwdG5ybzlpdCJ9.6UOuKmCY7rjpY0If62xHzg'

  request({url: mapbox_url, json: true}, (error, response) => {
    console.log(response.body)

    if (error) {
      callback('Unable to connect to the server', undefined)
    }
    else if (response.body.features === undefined || response.body.features.length === 0) {
      callback('Unable to find location', undefined)
    }
    else {
      callback(undefined, {
        location: response.body.features[0].place_name,
        long: response.body.features[0].center[0],
        lat: response.body.features[0].center[1]
      })
    }
  })
}

module.exports = geocode