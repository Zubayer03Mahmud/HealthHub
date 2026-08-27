/**
 * User Model
 *
 * Handles user lookup for authentication.
 *
 * @module UserModel
 */

const mockDatabase = require('../data/mock-database');

class UserModel {
    /**
     * Finds a user by registered email.
     *
     * @param {string} email User email address.
     * @returns {Object|null} User record or null.
     */
    static findByEmail(email) {
        const user = mockDatabase.users.find(
            (u) => u.email.toLowerCase() === email.toLowerCase()
        );

        return user || null;
    }
}

module.exports = UserModel;