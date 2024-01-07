import crypto from 'crypto';
import { generateSalt, generateSecurePassword, hashPassword } from "../../utils/crypto";

const expectedHexValue = 'b0033c4cd78920a0a3ec7807f911c49d';


describe('Unite Tests', () => {

  describe('generate password Salt', () => {
    it('should return 16 random hex chars', async () => {
      const hex = await generateSalt();

      expect(hex.length).toEqual(32); // Expected hex string length
  
      });
  });
  
  describe('hash password', () => {
    it('should return hashed password', async () => {
      const password = "12345678"
      const salt = "b0033c4cd78920a0a3ec7807f911c49d"
      const hashedPasswordMock = "a87c1457cb73718de47f03d51048829e435d0c1d1ebacf9dd581c2d83ca34712"
      const hashedPassword = await hashPassword(password, salt)
  
      expect(hashedPassword).toEqual(hashedPasswordMock)
      
    })
  })

  describe('Generate Secure Password', () => {
    it('should generate a secure password', async () => {
      const password = 'mySecurePassword123';
  
      const securePassword = await generateSecurePassword(password);
  
      expect(securePassword).toHaveProperty('hashedPassword');
      expect(securePassword).toHaveProperty('salt');
  
      expect(typeof securePassword.hashedPassword).toBe('string');
      expect(typeof securePassword.salt).toBe('string');
  
      const hashedPassword = await hashPassword(password, securePassword.salt);
      expect(securePassword.hashedPassword).toEqual(hashedPassword);
    });
  })

})


describe('Integration Test', () => {
  it('should generate a valid SecurePassword using generateSecurePassword', async () => {
    const password = '12345678';
    const securePassword = await generateSecurePassword(password);

    // Check if the hashed password matches the expected hash
    const hashedPassword = await hashPassword(password, securePassword.salt);
    expect(securePassword.hashedPassword).toBe(hashedPassword);
  });
});
