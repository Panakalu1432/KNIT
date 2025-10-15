const { get, run, all } = require('../config/db');

 
 exports.findAll = async () => {
     const sql = `
        SELECT 
            p.id, 
            p.name, 
            p.description, 
            p.price, 
            u.email AS created_by_email,
            p.created_at
        FROM products p
        JOIN users u ON p.created_by = u.id
        ORDER BY p.created_at DESC
    `;
     return await all(sql);
};

 exports.findById = async (id) => {
     const sql = `
        SELECT 
            p.id, 
            p.name, 
            p.description, 
            p.price, 
            u.email AS created_by_email,
            p.created_at
        FROM products p
        JOIN users u ON p.created_by = u.id
        WHERE p.id = ?
    `;
     return await get(sql, [id]);
};
 
exports.create = async (name, description, price, createdById) => {
    const sql = `
        INSERT INTO products (name, description, price, created_by)
        VALUES (?, ?, ?, ?)
    `;
     const result = await run(sql, [name, description, price, createdById]);
     return result.lastID;
};

 exports.update = async (id, name, description, price) => {
    const sql = `
        UPDATE products 
        SET name = ?, description = ?, price = ?
        WHERE id = ?
    `;
    const result = await run(sql, [name, description, price, id]);
     return result.changes;
};

 exports.remove = async (id) => {
    const sql = 'DELETE FROM products WHERE id = ?';
    const result = await run(sql, [id]);
    return result.changes;
};
