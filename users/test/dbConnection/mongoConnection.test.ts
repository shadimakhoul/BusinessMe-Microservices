import mongoose from 'mongoose';
import dbConnection from '../../dbConnection/mongoConnection'; // Assuming this is the file containing dbConnection function

// Mock mongoose functions
jest.mock('mongoose');

describe('Database Connection Test', () => {
  /* The reason for restoring functions like console.log after mocking is often a good practice to ensure test isolation.
  When you mock a function or modify its behavior (such as replacing console.log with a Jest mock function),
  it's possible that other tests or parts of your code, especially in the same test suite, might rely on the original behavior of that function.*/
  
  let originalLog: any; // Store original console.log

  beforeAll(() => {
    originalLog = console.log; // Store the original console.log
    console.log = jest.fn(); // Mock console.log with a Jest mock function
  });

  afterAll(() => {
    console.log = originalLog; // Restore original console.log after tests
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  
  it('should connect to the database', async () => {
    // Mock the mongoose.connect function to simulate successful connection
    mongoose.connect = jest.fn().mockReturnValue(Promise.resolve());

    // Call the dbConnection function
    await dbConnection();

    // Check if mongoose.connect was called
    expect(mongoose.connect).toHaveBeenCalledWith(
      expect.any(String), // Ensure it's called with a string (URL)
      expect.objectContaining({ dbName: 'businessMe' }) // Ensure correct options are passed
    );

    // Check if console.log("DB Connected") was called
    expect(console.log).toHaveBeenCalledWith("DB Connected");
  });

  it('should handle database connection error', async () => {
    const mockError = new Error('Database connection error');
    // Mock the mongoose.connect function to simulate an error
    mongoose.connect = jest.fn().mockRejectedValue(mockError);

    // Call the dbConnection function
    await dbConnection();

    // Check if error message is logged
    expect(console.log).toHaveBeenCalledWith('DB Error', mockError.message);
  });
});