const User = require('../models/User');

const getUsers = async (req, res) => {
    try {
        const user = await User.find({ role: { $not: { $all: ['admin'] } } }).select('-password');
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteUserById = async (req, res) => {
    try {
        // get the user id from the request parameters
        const { userId } = req.params;
        // find the user by id
        const user = await User.findById(userId);
        // if the user does not exist, return a 404 response
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // delete the user
        await User.findByIdAndDelete(userId);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { getUsers, deleteUserById };
