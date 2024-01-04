import jwt from 'jsonwebtoken';
import { createTokens, verifyToken } from '../../utils/auth'; // Assuming you have this file
import { User } from '../../global-interfaces/user';
import { createTestUser } from '../../utils/helpers';
import { AccessToken } from '../../instance';

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
  verify: jest.fn(),
}));

describe('createTokens', () => {
  const mockPayload: User = createTestUser()
  const mockAccessToken = 'mockAccessToken';
  const mockRefreshToken = 'mockRefreshToken';

  beforeEach(() => {//mock tokens befor each test
    process.env.JWT_ACCESS_SECRET_KEY = 'accessSecret';
    process.env.JWT_REFRESH_SECRET_KEY = 'refreshSecret';
    (jwt.sign as jest.Mock ).mockReturnValueOnce(mockAccessToken).mockReturnValueOnce(mockRefreshToken);
  });

  afterEach(() => {//clear mocks after each test
    jest.clearAllMocks();
  });

  it('should create tokens with default expiration', async () => {
    const tokens = await createTokens(mockPayload);

    expect(tokens).toBeTruthy();

    if (!tokens) {
        expect(true).toBe(false); // Fails the test if tokens are falsy
        return;
    }

    expect(tokens?.accessToken).toBe(mockAccessToken);
    expect(tokens?.refreshToken).toBe(mockRefreshToken);
    expect(jwt.sign).toHaveBeenCalledTimes(2);
    expect(jwt.sign).toHaveBeenCalledWith({ user: mockPayload }, 'accessSecret', { expiresIn: '10m' });
    expect(jwt.sign).toHaveBeenCalledWith({ user: mockPayload }, 'refreshSecret', { expiresIn: '1d' });
  });

  // Add more test cases to cover other scenarios (e.g., missing secrets, errors, etc.)
});

describe('verifyToken', () => {
  const mockToken = 'mockToken';
  const mockDecodedToken = { username: 'testuser', email: 'test@gmail.com' };

  beforeEach(() => {
    process.env.JWT_ACCESS_SECRET_KEY = 'accessSecret';
    process.env.JWT_REFRESH_SECRET_KEY = 'refreshSecret';
    (jwt.verify as jest.Mock ).mockReturnValueOnce(mockDecodedToken);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should verify and decode access token', async () => {
    const decodedUser = await verifyToken(mockToken, AccessToken);
    
    expect(decodedUser).toEqual(mockDecodedToken);
    expect(jwt.verify).toHaveBeenCalledWith(mockToken, 'accessSecret');
  });

  // Add more test cases to cover other scenarios (e.g., invalid tokens, missing secrets, errors, etc.)
});


describe('createTokens Errors', () => {
  const mockPayload: User = createTestUser()

  it('should handle errors in token creation', async () =>{
    const token = await createTokens(mockPayload)
    expect(token).toBe(false)
  })
})

describe('verifyTokens Errors', () => {
  const mockToken = 'mockToken';
  const mockDecodedToken = { userId: '123', username: 'testuser' };
  it('should handle errors in token verify', async () =>{
    const token = await verifyToken(mockToken, AccessToken)
    expect(token).toBe(false)
  })
})