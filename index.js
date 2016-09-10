const path = require('path')
const express = require('express')
const cons = require('consolidate')
const dust = require('dustjs-linkedin')
const helpers = require('dustjs-helpers')

const workdir = process.cwd()
const app = express()

const baseViewModel = dust.context({
  globalTest: true
})

app.engine('dust', cons.dust)
cons.dust.helpers = helpers
app.set('view engine', 'dust')
app.set('views', path.join(workdir, 'views'))

app.get('/', (req, res) => {
  const viewModel = baseViewModel.push({
    collection: [1, 2, 3]
  })
  res.render('index', viewModel)
})

app.listen(3100, () => console.log(`Listening on port 3100`))
