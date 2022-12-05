const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, '../public')));
// app.use('/', express.static(path.join(__dirname, '/public')));
// this one serves the js portion
app.use('/js', express.static(path.join(__dirname, '../public/index.js')));
// this one servers the styles portion
app.use('/styles', express.static(path.join(__dirname, '../public/index.css')));

const { 
  getAllPokemon,
  myTables,
  createPokemon,
  getLegendaries
} = require('./controller')

app.get('/api/pokemon', getAllPokemon)
app.get('/api/get', myTables)
app.post('/api/pokemo', createPokemon)
// app.get('/api/randomAttack', randomAttackNum)


const port = process.env.PORT || 4001

app.listen(port, () => {
  console.log(`Partying on port ${port}`)
})