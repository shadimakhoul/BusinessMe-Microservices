import express from 'express' ;
import { Express } from 'express';
import bodyParser from  'body-parser';
import cors from 'cors';
import router from  './routes/router';
import errorMiddleware from "./middlewares/error"

const expressApp = async (app: Express) => {
    app.use(bodyParser.json())
    app.use(express.urlencoded({ extended: false }))
    app.use(cors())
    app.disable('etag');
    app.use('/api', router)    
    app.use(errorMiddleware);
}

export default expressApp;