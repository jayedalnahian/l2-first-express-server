import dotenv from 'dotenv'
import path from 'path';
dotenv.config({path: path.join(process.cwd(), '.env')});
import express, { Request, Response } from 'express'
import { Pool } from 'pg';
const app = express()
const port = 5000

const pool = new Pool({
    connectionString: `${process.env.CONNECTION_STRING}`
});

const initDb = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT null,
        email VARCHAR(100) NOT null UNIQUE,
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
initDb()


// percer
app.use(express.json())
// app.use(express)

app.get('/', (req: Request, res: Response) => {
    res.send('Hello Next Level Developers!')
})


app.post('/', (req: Request, res: Response) => {
    console.log(req.body);
    res.status(201).json({
        status: 'success',
        message: 'Api is woring'
    })
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
