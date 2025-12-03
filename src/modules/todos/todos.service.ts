import { pool } from "../../config/db";


const createTodo = async (user_id: string, title: string) => {
    const result = await pool.query(`INSERT INTO todos (user_id, title) VALUES ($1, $2) RETURNING *`, [user_id, title]);
    return result
}

const getAllTodos = async () => {
    const result = await pool.query(`SELECT * FROM todos`);
    return result;
}

const getSingleTodo = async (id: string) => {
    const result = await pool.query(`SELECT * FROM todos WHERE id = $1`, [id])
    return result
}


export const todosService = {createTodo, getAllTodos, getSingleTodo}