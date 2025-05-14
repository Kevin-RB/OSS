const userService = require('../services/userService');

const getUsers = async (req, res) => {
    try {
        const user = await userService.getAllNonAdminUsers();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteUserById = async (req, res) => {
    try {
        // get the user id from the request parameters
        const { userId } = req.params;
        
        const result = await userService.deleteUserById(userId);

        if (!result.success) {
            return res.status(404).json({ message: result.message });
        }

        res.status(200).json({ message: result.message });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { getUsers, deleteUserById };
