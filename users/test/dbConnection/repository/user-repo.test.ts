import { createUser, getUser, getUsers } from '../../../dbConnection/repository/user-repo';
import { UserModel } from '../../../dbConnection/models/index'; // Assuming the UserModel is imported from another file
import { User } from '../../../global-interfaces/user';
import { createTestUser } from '../../../utils/helpers';

jest.mock('../../../dbConnection/models/index'); // Mocking the UserModel

describe('test user functions', () => {
  const mockUser: User = createTestUser()

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it('should create a new user', async () => {
    UserModel.prototype.save = jest.fn().mockResolvedValue(mockUser);

    const result = await createUser(mockUser);

    expect(result).toBe(mockUser);
    expect(UserModel.prototype.save).toHaveBeenCalledTimes(1);
  });

  it('should get users', async () => {
    await getUsers()
    expect(UserModel.find).toHaveBeenCalledTimes(1);
    
  })

  it('getUser returns a promise that resolves to the user model with the given id', async () => {
    const id = '658c961e5299d84730025307';
    const expectedUser = new UserModel(mockUser);

    // Mock the findById method of the UserModel
    UserModel.findById = jest.fn().mockResolvedValue(expectedUser);

    const result = await getUser(id);
    
    expect(result).toBe(expectedUser)
    expect(UserModel.findById).toHaveBeenCalledWith(id)
    expect(UserModel.findById).toHaveBeenCalledTimes(1)
});


});
