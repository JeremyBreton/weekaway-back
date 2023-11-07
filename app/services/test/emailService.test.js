import isValidEmail from '../emailService.js';

describe('validEmail', () => {
  it('should return true if the email is valid', () => {
    const email = 'jean.mark@google.com';
    const result = isValidEmail(email);
    expect(result).toBe(true);
  });
  it('should return false if the email is invalid', () => {
    const email = 'jean.mark@google';
    const result = isValidEmail(email);
    expect(result).toBe(false);
  });
});
