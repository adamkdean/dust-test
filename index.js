const path = require('path')
const hoffman = require('hoffman')
const express = require('express')
const request = require('request')
const duster = require('duster')
const dust = duster.dust

const app = express()
const base = dust.context({
  isBase: true,
  age: 26,
  people: [
    { name: 'exampleA' },
    { name: 'exampleB' }
  ]
})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'dust')
app.engine('dust', hoffman.__express())

app.get('/', function (req, res) {
  res.render('people', {})
})

app.get('/pojo', function (req, res) {
  res.render('people', {
    age: 26,
    people: [
      { name: 'exampleA' },
      { name: 'exampleB' }
    ]
  })
})

app.get('/context', function (req, res) {
  res.render('people', base.push({
    people: [
      { name: 'adam' }
    ]
  }))
})

app.listen(4000, function () {
  console.log('Visit http://localhost:4000 to see streaming!')
})
