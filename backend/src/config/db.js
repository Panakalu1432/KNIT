const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');

const DB_PATH = path.resolve(__dirname, 'knit.sqlite');

let dbConnection = null;


const get = async (sql, params = []) => {
    if (!dbConnection) throw new Error('Database connection not established.');
    return await dbConnection.get(sql, params);
};

const all = async (sql, params = []) => {
    if (!dbConnection) throw new Error('Database connection not established.');
    return await dbConnection.all(sql, params);
};

const run = async (sql, params = []) => {
    if (!dbConnection) throw new Error('Database connection not established.');
    return await dbConnection.run(sql, params);
};

const initializeTables = async () => {
    console.log('Initializing tables...');
    await run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role TEXT DEFAULT 'User' NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);
    
    await run(`
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            price REAL NOT NULL,
            created_by INTEGER NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (created_by) REFERENCES users (id) ON DELETE CASCADE
        );
    `);
    
    const adminExists = await get("SELECT id FROM users WHERE email = ?", ['admin@example.com']);
    if (!adminExists) {
        const bcrypt = require('bcrypt');
        const adminPasswordHash = await bcrypt.hash('admin123', 10);
        await run(`
            INSERT INTO users (email, password, role)
            VALUES (?, ?, ?)
        `, ['admin@example.com', adminPasswordHash, 'Admin']);
        console.log('Seeded default Admin user: admin@example.com');
    }

    console.log('Database initialization complete.');
};


const initializeDatabase = async () => {
    if (dbConnection) return;

    dbConnection = await open({
        filename: DB_PATH,
        driver: sqlite3.Database,
    });
    console.log('Database connection established using sqlite3 (Pure JS driver).');
    
    await initializeTables();
};

module.exports = {
    initializeDatabase,
    run,
    get,  
    all,
};
