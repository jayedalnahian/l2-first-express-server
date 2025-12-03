import { Pool } from 'pg';
import config from '.';

const pool = new Pool({
    connectionString: `${config.connectionString}`
});

const initDb = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT null,
        email VARCHAR(100) NOT null UNIQUE,
        password TEXT NOT null,
        age INT,
        phone VARCHAR(15),
        address Text,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    ) `);
    await pool.query(`
        CREATE TABLE IF NOT EXISTS todos(
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(200),
        description TEXT,
        completed BOOLEAN DEFAULT FALSE,
        due_date DATE,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    ) `);
    console.log('Tables are created or already exist.');

};


export { pool, initDb };