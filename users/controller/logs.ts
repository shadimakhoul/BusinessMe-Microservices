import { Request, Response, NextFunction } from 'express';
import { createUser } from "../dbConnection/repository/user-repo"
import { User } from '../global-interfaces/user';
import { badRequest, somethingWentWrong, userCreatedSuccessfully } from '../instance';
import { ErrorHandler } from '../utils/errorHandler';

const signup = async (req: Request, res: Response, next: NextFunction) => {      
    let user: User = req?.body    
    if (
        !user 
        || user.username == undefined 
        || user.email == undefined 
        || user.password == undefined 
        || user.accountType == undefined
        ){
            return res.status(400).json({
                success: false,
                message: badRequest
        })
    }

    const newUser = await createUser(user)
    console.log(newUser);

    if (newUser) {
        return next(new ErrorHandler("NotValidData", 400));
    }

    return res.status(201).json({
        success: true,
        message: userCreatedSuccessfully
    })
}

export {
    signup
}