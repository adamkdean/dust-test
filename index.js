const path = require('path')
const express = require('express')
const hoffman = require('hoffman')
const request = require('request')
const duster = require('duster')
const dust = duster.dust
const app = express()

const baseViewModel = dust.context({
  globalTest: true
})

app.set('views', path.join(process.cwd(), 'views'))
app.set('view engine', 'dust')
app.engine('dust', hoffman.__express())
app.use(hoffman.stream)

app.get('/', (req, res) => {
  const viewModel = baseViewModel.push({
    collection: [
      { name: 'first' },
      { name: 'second' },
      { name: 'third' }
    ]
  })
  console.log('--------------------------')
  console.log('viewModel', viewModel)
  console.log('--------------------------')
  res.render('index', { '__STACK__': viewModel })
})

app.listen(3100, () => console.log(`Listening on port 3100`))


// app.get('/', function (req, res) {
//   res.stream('hello', {
//     'async': function(chunk, context, bodies, params) {
//       return chunk.map(function(chunk) {
//         // Introducting an artificial delay to make streaming more apparent
//         setTimeout(function() {
//           request('http://www.dustjs.com/')
//           .on('data', chunk.write.bind(chunk))
//           .on('end', chunk.end.bind(chunk));
//         }, 3000);
//       });
//     }
//   });
// });

// app.listen(3100, function () {
//   console.log('Visit http://localhost:3100 to see streaming!');
// });
