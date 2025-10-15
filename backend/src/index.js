const express = require('express');
const cors = require('cors');
const { initializeDatabase } = require('./config/db');


const apiRoutes = require('./routes/v1/index');
const errorHandler = require('./middleware/errorHandler');

const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || 'development';

const app = express(); 
 app.use(cors());  
app.use(express.json());  
app.use(express.urlencoded({ extended: true }));


 app.get('/', (req, res) => {
    res.send(`Knit Backend API. Environment: ${ENV}.`);
});

 app.use('/api/v1', apiRoutes);

 app.use(errorHandler);

 const startServer = async () => {
    try {
        console.log(`Environment: ${ENV}`);
        await initializeDatabase();
        
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}...`);
            console.log(`API Docs/Base: http://localhost:${PORT}/api/v1`);
        });
    } catch (error) {
        console.error('FATAL ERROR during server startup:', error.message);
       
    }
};

 startServer();
