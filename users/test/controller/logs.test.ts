import request from 'supertest'; 'supertest';
import StartServer from '../../app'; // Replace with the path to your Express app file
import { createTestUser } from '../../utils/helpers';


import * as userRepo from '../../dbConnection/repository/user-repo';
import * as auth from '../../utils/auth';
import * as crypto from '../../utils/crypto';
import { badRequest, somethingWentWrong } from '../../instance';
import { ErrorHandler } from '../../utils/errorHandler';

describe('POST /signup', () => {
    let server: any;

    beforeAll(async () => {
        server = await StartServer();
    });

    beforeEach(() => {
        jest.clearAllMocks();
    })

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return 201 on successful signup', async () => {
        const mockUser = createTestUser();
        const mockTokens = { accessToken: 'mockAccessToken', refreshToken: 'mockRefreshToken' };

        jest.spyOn(userRepo, 'createUser').mockResolvedValue(mockUser as any);
        jest.spyOn(auth, 'createTokens').mockResolvedValue(mockTokens);
        jest.spyOn(crypto, 'generateSecurePassword').mockResolvedValue({ hashedPassword: 'mockHash', salt: 'mockSalt' });

        const response = await request(server)
            .post('/api/signup')
            .send(mockUser);

        expect(response.status).toBe(201);
        expect(response.body).toEqual({ success: true, message: 'User created successfully' });
    });

    it('should return 400 on bad request', async () => {
        const mockUser = { username: 'anyusername' }
        const response = await request(server)
            .post('/api/signup')
            .send(mockUser);

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ success: false, message: badRequest });
    });


    it('should return 409 on duplicate email', async () => {
        const mockUser = createTestUser();
        const mockTokens = { accessToken: 'mockAccessToken', refreshToken: 'mockRefreshToken' };
        const mockError = new ErrorHandler('Email already exists', 409);

        const spyCreateUser = jest.spyOn(userRepo, 'createUser').mockRejectedValue(mockError);
        const spyAuth = jest.spyOn(auth, 'createTokens').mockResolvedValue(mockTokens);

        const response = await request(server)
            .post('/api/signup')
            .send(mockUser);
            

        expect(response.status).toBe(409); // 409 represents Conflict status for duplicate resource
        expect(response.body).toEqual({ success: false, message: 'Email already exists' });

        expect(spyCreateUser).toHaveBeenCalledTimes(1)
        expect(spyAuth).toHaveBeenCalledTimes(0)
    });
});

