
const verifyAdmin = async (req, res, next) => {
    try {
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
