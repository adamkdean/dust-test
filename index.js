const fs = require('fs')
const path = require('path')
const express = require('express')
const dust = require('dustjs-linkedin')

const app = express()
const base = dust.context({
  isBase: true,
  age: 26,
  people: [
    { name: 'exampleA' },
    { name: 'exampleB' }
  ]
})

dust.onLoad = function(template, callback) {
  const file = path.resolve('/', template + '.dust')
  const view = path.join('./views', file)
  fs.readFile(view, { encoding: 'utf8' }, callback)
}

app.render = function (view, context, res) {
  dust.render(view, context, (err, str) => {
    if (err) throw err
    res.end(str)
  })
}

app.get('/', function (req, res) {
  app.render('people', {}, res)
})

app.get('/pojo', function (req, res) {
  app.render('people', {
    age: 26,
    people: [
      { name: 'exampleA' },
      { name: 'exampleB' }
    ]
  }, res)
})

app.get('/context', function (req, res) {
  app.render('people', base.push({
    people: [
      { name: 'adam' }
    ]
  }), res)
})

app.listen(4000, function () {
  console.log('Visit http://localhost:4000 to see streaming!')
})
