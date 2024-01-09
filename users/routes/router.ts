import { Router, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser'
import { signup } from '../controller/logs';
import catchAsyncError from "../middlewares/catchAsyncError"

const router: Router = Router()


router.get("/", catchAsyncError( async (req: Request, res: Response, next: NextFunction) => {    
    return res.send('Hi, Main Microservice is working');
}))

router.post("/signup", catchAsyncError(signup))

export default router;

