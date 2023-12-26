require('dotenv').config()
const express = require('express')
const cors = require('cors')
const proxy = require('express-http-proxy')

const app = express()

app.use(cors())
app.use(express.json())

app.use("/", proxy(`${process.env.HOST}:${process.env.MAIN_PORT}`))

if (!process.env.ONLINE){
    var http = require('http').createServer(app);
    http.listen(process.env.MAIN_PORT, () => {
        console.log(`Http Gateway server is working on port ${process.env.MAIN_PORT}`);
    })
}else{
    var https = require('https').createServer(app);
    https.listen(process.env.MAIN_PORT, () => {
        console.log(`Https Gateway server is working on port ${process.env.MAIN_PORT}`);
    })
}