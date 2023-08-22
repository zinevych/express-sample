const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]; // Assumes "Bearer TOKEN"
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken; // Adds the user payload to the request
        next();
    } catch (error) {
        res.status(401).json({ message: 'Auth failed' });
    }
};
