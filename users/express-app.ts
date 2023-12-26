import express from 'express' ;
import { Express } from 'express';
import bodyParser from  'body-parser';
import cors from 'cors';
import router from  './routes/router';
import errorMiddleware from "./middlewares/error";

const expressApp = async (app: Express) => {
    app.use(bodyParser.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cors())
    app.use('/', router)
}

export default expressApp;