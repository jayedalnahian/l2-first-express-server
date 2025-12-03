import express, { NextFunction, Request, Response } from 'express';
import { initDb } from './config/db';
import { pool } from './config/db';
import loggerMiddleware from './middleware/logger';
import { userRoutes } from './modules/users/user.routes';
import { todosRouter } from './modules/todos/todos.routes';
import { authRoutes } from './modules/auth/auth.routes';
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

// user route moved to user.routes.ts
app.use('/users', userRoutes)

// todos route moved to todos.routes.ts
app.use('/todos', todosRouter)

app.use('/auth', authRoutes)

app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    })
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
