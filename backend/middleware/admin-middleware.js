
const verifyAdmin = async (req, res, next) => {
    try {
        // from the user object in the request, check if the user is an admin
        const user = req.user;
        if(user?.role[0] === 'admin') {
            next();
        }
        else {
            res.status(401).json({ message: 'Not authorized as an admin' });
        }
    }catch (error) {
        res.status(500).json({ message: error.message });
    }

};

module.exports = { verifyAdmin };
