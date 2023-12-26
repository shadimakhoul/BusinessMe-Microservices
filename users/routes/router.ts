import { Router, Request, Response } from 'express';
import bodyParser from 'body-parser'
import { signup } from '../controller/logs';
import catchAsyncError from "../middlewares/catchAsyncError"

const router: Router = Router()

router.use(bodyParser.json())

router.get("/", (req: Request, res: Response) => {
    return res.send('Hi, Main Microservice is working');
})

router.post("/signup", catchAsyncError(signup))

export default router;

