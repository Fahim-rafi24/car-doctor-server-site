// set express in file
const express = require('express')
// set cors in file
const cors = require('cors')
// set port
const port = process.env.PORT || 3000;
// make a server app 
const app = express()


// use cors in app
app.use(cors())
// use express json for import/export client side data
app.use(express.json())










app.listen(port, () => {
    console.log(`server run by ${port}`)
})