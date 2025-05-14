const User = require('../models/User');

class UserService {
    async getAllNonAdminUsers() {
        try {
            return await User.find({ role: { $not: { $all: ['admin'] } } }).select('-password');
        } catch (error) {
            throw new Error('Failed to fetch users: ' + error.message);
        }
    }

    async deleteUserById(userId) {
        try {
            // find the user by id
            const user = await User.findById(userId);
            // if the user does not exist, return a 404 response
            if (!user) {
                return { success: false, message: 'User not found' };
            }
            // delete the user
            await User.findByIdAndDelete(userId);
            return { success: true, message: 'User deleted successfully' };
        } catch (error) {
            throw new Error('Failed to delete user: ' + error.message);
        }
    }
}

module.exports = new UserService(); 
