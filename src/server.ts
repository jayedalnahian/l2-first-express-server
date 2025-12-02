import express, { NextFunction, Request, Response } from 'express';
import { initDb } from './config/db';
import { pool } from './config/db';
import loggerMiddleware from './middleware/logger';
import { userRoutes } from './modules/users/user.routes';
const app = express()
const port = process.env.PORT || 5000;

initDb()

// percer
app.use(express.json())
// app.use(express)

app.get('/', loggerMiddleware, (req: Request, res: Response) => {
    res.send('Hello Next Level Developers!')
})





// CRUD Operations for Users

// post user route moved to user.routes.ts
app.use('/users', userRoutes)


app.get("/users/:id", loggerMiddleware, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id])
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }
        res.status(200).json({
            success: true,
            message: 'User retrieved successfully',
            data: result.rows[0],
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        })
    }
});

app.put("/users/:id", loggerMiddleware, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        const result = await pool.query(`UPDATE USERS SET name = $1, email = $2 WHERE id = $3 RETURNING *`, [name, email, id])
        console.log(result);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }
        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: result.rows[0],
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
});

app.delete("/users/:id", loggerMiddleware, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await pool.query(`DELETE FROM USERS WHERE id = $1 RETURNING *`, [id])
        console.log(result);

        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }
        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: null,
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
});




// CRUD Operations for Todos
app.post('/todos', loggerMiddleware, async (req: Request, res: Response) => {
    const { user_id, title } = req.body;
    try {
        const result = await pool.query(`INSERT INTO todos (user_id, title) VALUES ($1, $2) RETURNING *`, [user_id, title]);
        res.status(201).json({
            success: true,
            message: 'Todo created successfully',
            data: result.rows[0],
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
});

app.get('/todos', loggerMiddleware, async (req: Request, res: Response) => {
    try {
        const result = await pool.query(`SELECT * FROM todos`);
        res.status(200).json({
            success: true,
            message: 'Todos retrieved successfully',
            data: result.rows,
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
});

app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    })
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
