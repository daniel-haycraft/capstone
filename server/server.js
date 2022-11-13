const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
const {} = require('/db.json')

app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname, '/public')));
// this one serves the js portion
app.use('/js', express.static(path.join(__dirname, '/public/index.js')));
// this one servers the styles portion
app.use('/styles', express.static(path.join(__dirname, '/public/index.css')));

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})