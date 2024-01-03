 import jwt from 'jsonwebtoken';
import { TokenPair, User } from '../global-interfaces/user';
import { AccessToken, RefreshToken, UnknownError, tokenTypes } from '../instance';

const createTokens = async (payload: User, expirationIn?: string): Promise<TokenPair | false> => {
    try {
        // check token type
        let jwtAccessSecret = process.env.JWT_ACCESS_SECRET_KEY
        let jwtRefreshSecret = process.env.JWT_REFRESH_SECRET_KEY

        if (!jwtAccessSecret || !jwtRefreshSecret) {
            throw new Error('JWT secret key is not defined.');
        }

        const accessToken = jwt.sign({ user: payload }, jwtAccessSecret, { expiresIn: expirationIn || "10m"})
        const refreshToken = jwt.sign({ user: payload }, jwtRefreshSecret, { expiresIn: expirationIn || "1d"})
        
        if(!accessToken || !refreshToken){
            throw new Error('Something went wrong!');
        }

        return {accessToken, refreshToken}

    } catch (error) {
        console.log(error instanceof Error ? error.message : UnknownError);
        return false
    }
};

const verifyToken = async (token: string, tokenType: tokenTypes): Promise<User | false> => {
    try {
        var jwtSecret: string | undefined
        if (tokenType === AccessToken){
            jwtSecret = process.env.JWT_ACCESS_SECRET_KEY
        }else if (tokenType === RefreshToken){
            jwtSecret = process.env.JWT_REFRESH_SECRET_KEY
        }else{
            jwtSecret = undefined
        }

        if (!jwtSecret) {
            throw new Error('JWT secret key is not defined.');
        }

        // Verify the token and get the decoded payload
        const decodedToken = jwt.verify(token, jwtSecret) as User;

         // Ensure that the decoded token is of type User
         if (!decodedToken || typeof decodedToken !== 'object') {
            throw new Error('Invalid token payload');
        }
        
        return decodedToken
    } catch (error) {
        console.log(error instanceof Error ? error.message : UnknownError);
        return false
    }
};


export {
    createTokens,
    verifyToken
}