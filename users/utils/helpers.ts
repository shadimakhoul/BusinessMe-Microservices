import { User } from "../global-interfaces/user"
import { accessStatuss, accessTypes } from "../instance";
function createTestUser(): User {
    return {
      username: 'example',
      email: 'example@example.com',
      phoneNumber: '1234567890',
      password: 'password',
      salt: 'somesalt',
      accountType: accessTypes.User,
      accountStatus: accessStatuss.Blocked,
      lastLogin: new Date(),
      created_at: new Date(),
      updated_at: new Date(),
    };
  }

export {
  createTestUser
}