import jwt from 'jsonwebtoken';
import { createTokens, verifyToken } from '../../utils/auth'; // Assuming you have this file
import { User } from '../../global-interfaces/user';
import { accessStatuss, accessTypes } from '../../instance';
import { createTestUser } from '../../utils/helpers';

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
  verify: jest.fn(),
}));

describe('createTokens', () => {
  const mockPayload: User = createTestUser()
  const mockAccessToken = 'mockAccessToken';
  const mockRefreshToken = 'mockRefreshToken';

  beforeEach(() => {
    process.env.JWT_ACCESS_SECRET_KEY = 'accessSecret';
    process.env.JWT_REFRESH_SECRET_KEY = 'refreshSecret';
    (jwt.sign as jest.Mock ).mockReturnValueOnce(mockAccessToken).mockReturnValueOnce(mockRefreshToken);
  });

  afterEach(() => {
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
  const mockDecodedToken = { userId: '123', username: 'testuser' };

  beforeEach(() => {
    process.env.JWT_ACCESS_SECRET_KEY = 'accessSecret';
    process.env.JWT_REFRESH_SECRET_KEY = 'refreshSecret';
    (jwt.verify as jest.Mock ).mockReturnValueOnce(mockDecodedToken);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should verify and decode access token', async () => {
    const decodedUser = await verifyToken(mockToken, 'AccessToken');

    expect(decodedUser).toEqual(mockDecodedToken);
    expect(jwt.verify).toHaveBeenCalledWith(mockToken, 'accessSecret');
  });

  // Add more test cases to cover other scenarios (e.g., invalid tokens, missing secrets, errors, etc.)
});
