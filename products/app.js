require('dotenv').config()
const express = require('express');

const { dbConnection } = require('./dbConnection');
//call the router
const expressApp = require('./express-app');

const StartServer = async () => {
    const app = express()
    
    await dbConnection()
    await expressApp(app)//init app server

    const online = false
    
    var server;
    var serverType;
    if (!online){
        server = require('http').createServer(app)
        serverType = 'Http'
    }else {
        server = require('https').createServer(app)
        serverType = 'Https'
    }

    server.listen(process.env.PORT, () => {
        console.log(`server ${serverType} is working on port: ${process.env.PORT}, Processing service ${process.env.SERVICE_NAME}`);
    }).on('error', (err) => {
        console.log(`server port ${process.env.PORT} error`, err.message);
    })
}

StartServer()

