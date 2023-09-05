const express = require('express');
var cors = require('cors');
const connectToMongo = require('./db');
connectToMongo()
const app = express()
const port = 5000
app.use(cors())
app.use(express.json())
// Available Routes
app.use('/',require('./routes/add'))
app.listen(port,()=>{
    console.log(`We are listening at the localhost:${port}`);
})