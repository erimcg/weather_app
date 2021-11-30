

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const location = search.value
  console.log(location)

  fetch('http://localhost:3000/weather?address=' + location)
    .then((response) => {
      response.json()
        .then((data) => {
          if (data.error) {
            messageOne.textContent = data.error
            messageTwo.textContent = ''
          }
          else {
            messageOne.textContent = data.city + ", " + data.region
            messageTwo.textContent = 'Temperature: ' + data.temperature + ' degrees'
          }
        })
    })

})
