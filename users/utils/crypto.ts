import crypto from 'crypto';
import { SecurePassword } from '../global-interfaces/user';

// Generate a random salt for password hashing
async function generateSalt(): Promise<string>{
    return crypto.randomBytes(16).toString('hex');
  }

// Hash the password using SHA-256 and the salt
async function hashPassword(password: string, salt: string): Promise<string> {
    const hash = crypto.createHash('sha256');
    hash.update(password + salt);
    return hash.digest('hex');
}

async function generateSecurePassword(password: string): Promise<SecurePassword>{
      // hashing password::begin
      const salt = await generateSalt()
      const hashedPassword = await hashPassword(password, salt)
      // hashing password::end

      return {hashedPassword, salt}
}


export {
  hashPassword,
  generateSecurePassword,
  generateSalt
}