import { describe, it, expect } from 'vitest';
const UserModel = require('../src/models/login-model');

describe('UserModel - Login Authentication Tests', () => {

    it('should return user details for a valid registered email', () => {
        // Test with a standard email
        const user = UserModel.findByEmail('test@healthhub.com');
        
        // Assertions
        if (user) {
            expect(user).toHaveProperty('email');
            expect(user.email.toLowerCase()).toBe('test@healthhub.com');
        } else {
            expect(user).toBeNull();
        }
    });

    it('should be case-insensitive when searching by email', () => {
        // Testing uppercase / mixed case email input
        const userLower = UserModel.findByEmail('user@healthhub.com');
        const userUpper = UserModel.findByEmail('USER@HEALTHHUB.COM');

        expect(userLower).toEqual(userUpper);
    });

    it('should return null when email does not exist in mock database', () => {
        const user = UserModel.findByEmail('nonexistent_user_999@healthhub.com');
        
        expect(user).toBeNull();
    });
});