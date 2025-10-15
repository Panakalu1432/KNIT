 const ApiError = require('../utils/ApiError');

 
const errorHandler = (err, req, res, next) => {
     let statusCode = err.statusCode || 500;
    
     if (typeof statusCode !== 'number' || statusCode < 100 || statusCode >= 600) {
        statusCode = 500;
    }

     let message = err.message || 'Internal Server Error';

     if (process.env.NODE_ENV === 'production' && statusCode === 500) {
        message = 'Server encountered an unexpected error.';
    }

     if (statusCode === 500 || statusCode === 400) {
        console.error(`[${statusCode} Error] ${message}`, err.stack);
    }

     res.status(statusCode).json({
        status: statusCode,
        message: message,
         stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
};

module.exports = errorHandler;
