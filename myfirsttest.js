const { add } = require('./math'); // Import the function to be tested

// Test suite for the 'add' function
describe('Addition Function', () => {
  test('should correctly add two numbers', () => {
    expect(add(1, 2)).toBe(3);  // Expect add(1, 2) to equal 3
    expect(add(-1, 1)).toBe(0); // Expect add(-1, 1) to equal 0
    expect(add(0, 0)).toBe(0);  // Expect add(0, 0) to equal 0
  });
});
