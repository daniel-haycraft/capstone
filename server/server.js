

const pokemon = require('./db.json')

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



app.get('/api/pokemo', (req, res) => {
  res.status(200).send(pokemon)
})

app.get('/api/get', (req, res) => {
  let allPoke = pokemon
  res.status(200).send(allPoke)
})


app.post('/api/pokemo', (req, res)=> {
  const { name, health, attack, imgURL, id } = req.body;
  pokemon.push({
    name,
    health,
    attack,
    imgURL,
    id
    });
   
  res.status(200).send(pokemon);
})



const port = process.env.PORT || 4001

app.listen(port, () => {
  console.log(`Partying on port ${port}`)
})