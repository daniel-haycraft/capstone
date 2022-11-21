const pokemon = require('./db.json')
const pokemonId = 13
const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
// const multer = require('multer')

app.use(express.json())
app.use(cors())


// const upload = multer({
//   dest: 'images'
//   })

// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send()
// })

app.use(express.static(path.join(__dirname, '../public')));
app.use('/', express.static(path.join(__dirname, '/public')));
// this one serves the js portion
app.use('/js', express.static(path.join(__dirname, '../public/index.js')));
// this one servers the styles portion
app.use('/styles', express.static(path.join(__dirname, '../public/index.css')));



app.get('/api/pokemo', (req, res) => {
  res.status(200).send(pokemon);
})


// app.put('api/pokemo/:id', (req, res)=> {
//   const { id } = req.params;
//   const {name, health, attack} = req.body;
//   const body = {
//     name: newName
//   }
//   const pokeIndex = pokemon.findIndex((poke) => poke.id === +id)
//   if (id === name){
//     pokemon[pokeIndex].newName
//      res.status(200).send(pokemon)
//   }

//   })
app.post('/api/pokemo', (req, res)=> {
  const { name, health, attack, imgURL } = req.body;
  pokemon.push({
    name,
    health,
    attack,
    imgURL,
    id: pokemonId
    });
    pokemonId++
  res.status(200).send(pokemon);
})
// console.log(pokemon[0])
// pokemon[0].push('')
// my next design i need accomplish is selecting pokemon and pushing them in to a battle array
app.get('/api/pokemo', (req, res) => {
  let chosen = []
  for (let i = 0; pokemon.length > i; i++ ){
    if(chosen[i] > 1){
    chosen.push(pokemon)
    } else {
      res.sendStatus(400)
    }
  }
  res.status(200).send(chosen)
})


const port = process.env.PORT || 4001

app.listen(port, () => {
  console.log(`Partying on port ${port}`)
})