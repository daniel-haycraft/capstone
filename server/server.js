

const pokemon = require('./db.json')
let pokemonId = 13
const express = require('express')
const cors = require('cors')
const path = require('path')
const { raw } = require('express')
const app = express()

app.use(express.json())
app.use(cors())




app.use(express.static(path.join(__dirname, '../public')));
// app.use('/', express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '../public/battle')));



// this one serves the js portion
app.use('/js', express.static(path.join(__dirname, '../public/index.js')));
app.use('/js', express.static(path.join(__dirname, '../battle/battle.js')));

// this one servers the styles portion
app.use('/styles', express.static(path.join(__dirname, '../public/index.css')));



app.get('/api/pokemo', (req, res) => {
  res.status(200).send(pokemon)
})

app.get('/api/get', (req, res) => {
  let allPoke = pokemon
  res.status(200).send(allPoke)
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
    id
    });
    id++
  res.status(200).send(pokemon);
})

// app.delete('/api/pokemo/:id', (req, res) => {

//   for (let i = 0; pokemon.length > i; i++){
//     const { id } = req.body
//       if(pokemon[i].id === id){
//          pokemon.splice(i, 1)
//          res.status(200).send(pokemon)
//       } else {
//         return sendStatus(400)
//       }

//   }
// })
// console.log(pokemon[0])
// pokemon[0].push('')
// my next design i need accomplish is selecting pokemon and pushing them in to a battle array



const port = process.env.PORT || 4001

app.listen(port, () => {
  console.log(`Partying on port ${port}`)
})