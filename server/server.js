const pokemon = require('./db.json')
const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()

app.use(cors())
app.use(express.json())

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



const port = process.env.PORT || 3005

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})