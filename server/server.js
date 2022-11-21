const pokemon = require('./db.json')
const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
const multer = require('multer')

app.use(cors())
app.use(express.json())

// const upload = multer({
//   dest: 'images'
//   })

// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send()
// })

app.use(express.static(path.join(__dirname, '../public')));
// app.use('/', express.static(path.join(__dirname, '/public')));
// this one serves the js portion
app.use('/js', express.static(path.join(__dirname, '../public/index.js')));
// this one servers the styles portion
app.use('/styles', express.static(path.join(__dirname, '../public/index.css')));



app.get('/api/pokemo', (req, res) =>{
  // let pokemon = require('./db.json')
 
    res.status(200).send(pokemon)
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
  const {name, health, attack, imgUrl,id} = req.body;
  pokemon.push({
    name,
    health,
    attack,
    imgURL,
    id
    });
    id++
  res.status(200).send(pokemon)
})
// console.log(pokemon[0])
// pokemon[0].push('')

const port = process.env.PORT || 4001

app.listen(port, () => {
  console.log(`Partying on port ${port}`)
})