import { Request, Response, NextFunction } from 'express';
import { createUser } from "../dbConnection/repository/user-repo"
import { TokenPair, User } from '../global-interfaces/user';
import { NotValidData, badRequest, somethingWentWrong, userCreatedSuccessfully } from '../instance';
import { ErrorHandler } from '../utils/errorHandler';
import { createTokens } from '../utils/auth';
import { generateSecurePassword } from '../utils/crypto';

const signup = async (req: Request, res: Response, next: NextFunction) => {      
    let user: User = req?.body    
    if (
        !user 
        || user.username == undefined 
        || user.email == undefined 
        || user.password == undefined 
        || user.accountType == undefined
        || user.phoneNumber == undefined
        ){
            return next(new ErrorHandler(badRequest, 500)) 
    }

    let {hashedPassword, salt} = await generateSecurePassword(user.password)
    user.password = hashedPassword
    user.salt = salt

    const newUser = await createUser(user)
    
    if (!newUser){
        return next(new ErrorHandler(somethingWentWrong, 400)) 
    }
    
    let tokens = await createTokens(newUser)
    
    if(!tokens){
        return next(new ErrorHandler(somethingWentWrong, 500))
    }
    
    return res.status(201).json({
        success: true,
        message: userCreatedSuccessfully
    })
}

export {
    signup
}