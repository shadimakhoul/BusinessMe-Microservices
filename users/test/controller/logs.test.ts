import request  from 'supertest'; 'supertest';
import StartServer from '../../app'; // Replace with the path to your Express app file
import { createTestUser } from '../../utils/helpers';


describe('POST /signup', () => {
    beforeEach(() => {
        jest.mock('../../dbConnection/repository/user-repo');
        jest.mock('../../utils/auth');
        jest.mock('../../utils/crypto');
    })
    let server: any
    beforeAll( async () => {
        server = await StartServer() 
    })

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return 201 on successful signup', async () => {
        const mockUser = createTestUser();
        const mockTokens = { accessToken: 'mockAccessToken', refreshToken: 'mockRefreshToken' };

        // Mock necessary functions
        require('../../dbConnection/repository/user-repo').createUser.mockResolvedValue(mockUser);
        require('../../utils/auth').createTokens.mockResolvedValue(mockTokens);
        require('../../utils/crypto').generateSecurePassword.mockResolvedValue({ hashedPassword: 'mockHash', salt: 'mockSalt' });

        const response = await request(server)
            .get('/api/signup')
            .send(mockUser);

        expect(response.status).toBe(201);
        expect(response.body).toEqual({ success: true, message: 'User created successfully' });
    });

});

