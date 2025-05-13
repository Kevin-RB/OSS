
const verifyRole = (allowedRoles)  => async (req, res, next) => {
    try {
        // from the user object in the request, check if the user is an admin
        const user = req.user;
        const userRoles = user?.role || [];
        // Check if the user has any of the allowed roles
        const isAllowed = userRoles.some(role => allowedRoles.includes(role));
        if(user && isAllowed) {
            next();
        }
        else {
            res.status(401).json({ message: 'Not authorized' });
        }
    }catch (error) {
        res.status(500).json({ message: error.message });
    }

};

module.exports = { verifyRole };
