const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const ApiError = require('../utils/ApiError');

const JWT_SECRET = process.env.JWT_SECRET || 'your_default_secret_key';

 exports.authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new ApiError(401, 'Access denied. No token provided.');
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            throw new ApiError(401, 'Access denied. Invalid token format.');
        }
        const decoded = jwt.verify(token, JWT_SECRET);

        req.user = { 
            id: decoded.id, 
            role: decoded.role 
        };

        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
             return next(new ApiError(401, 'Invalid or expired token.'));
        }
        next(error);  
    }
};

 exports.authorize = (requiredRole) => {
    return (req, res, next) => {
         if (!req.user || !req.user.role) {
             return next(new ApiError(401, 'Authentication required.'));
        }

        if (req.user.role !== requiredRole) {
            return next(new ApiError(403, `Forbidden: Access restricted to ${requiredRole} users.`));
        }

         next();
    };
};
