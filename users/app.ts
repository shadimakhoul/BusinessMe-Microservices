import express, { Express } from 'express' ;

import dotenv from 'dotenv'
dotenv.config()
import errorMiddleware from "./middlewares/error"

import { dbConnection } from './dbConnection';
//call the router
import expressApp from './express-app';

const app: Express = express()
const StartServer = async () => {
    
    await dbConnection()
    await expressApp(app)//init app server

    const online = false
    
    var server;

    type serverTypes = 'Http' | 'Https';
    let serverType: serverTypes
    
    if (!online){
        server = require('http').createServer(app)
        serverType = 'Http'
    }else {
        server = require('https').createServer(app)
        serverType = 'Https'
    }


    return server.listen(process.env.PORT, () => {
        console.log(`server ${serverType} is working on port: ${process.env.PORT}, Processing service ${process.env.SERVICE_NAME}`);
    })
    .on('error', (err: Error) => {
        console.log(`server port ${process.env.PORT} error`, err.message);
    })

}

StartServer()

export default StartServer;

