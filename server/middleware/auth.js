const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
let token = req.header('Authorization');
if (!token && req.headers.authorization) token = req.headers.authorization;
token = token?.replace('Bearer ', '').trim();
    if (!token) return res.status(401).send('Access Denied');
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) { 
      console.error('Auth error:', err.message);
      res.status(400).json({ message: 'Invalid Token' }); 
    }
};

const admin = (req, res, next) => {
    if (!req.user.isAdmin) return res.status(403).send('Admin access required');
    next();
};

module.exports = { auth, admin };