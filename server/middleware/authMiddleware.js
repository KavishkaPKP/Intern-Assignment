const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'secret123';

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Expecting "Bearer <token>"
    if (!token) return res.status(401).json({ message: 'Access Denied. No token provided.' });

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};

module.exports = authMiddleware;
