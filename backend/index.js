const { ExpressValidator } = require("express-validator");
const connectToMongo = require("./db");
const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config();
const port = 5000
connectToMongo()
//agar req.body ko console pe dekhna chahte ho to ye middleware use karna hoga 
app.use(express.json())
app.use(cors())
//available routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotes app listening on port ${port}`)
})