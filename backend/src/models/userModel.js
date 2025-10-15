const bcrypt = require('bcrypt');
const { run, get } = require('../config/db');

 const ADMIN_EMAIL = 'admin@knit.com';

 
exports.findByEmail = async (email) => {
    const sql = 'SELECT id, email, password, role FROM users WHERE email = ?';
    return await get(sql, [email]);
};

 
exports.create = async (email, password) => {
  const role = email.includes("admin") ? 'Admin' : 'User';
  const hashedPassword = await bcrypt.hash(password, 10);
  const sql = 'INSERT INTO users (email, password, role) VALUES (?, ?, ?)';
  const result = await run(sql, [email, hashedPassword, role]);
  return result.lastID;
};



exports.findById = async (id) => {
    const sql = 'SELECT id, email, role FROM users WHERE id = ?';
    return await get(sql, [id]);
};


exports.findByRole = async (role) => {
    const sql = 'SELECT id, email, role FROM users WHERE role = ?';
    const result = await run(sql, [role]);
    return result.rows || [];
};

