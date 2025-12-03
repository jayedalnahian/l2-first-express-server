import { pool } from "../../config/db";
import bcrypt from "bcryptjs";

interface CreateUserInput {
    name: string;
    email: string;
    password: string;
}

const createUser = async (payload: CreateUserInput) => {
    const { name, email, password } = payload;
    const hashedPass = await bcrypt.hash(password, 10)

    const result = await pool.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`, [name, email, hashedPass]);
    return result;
}


const getUsers = async () => {
    const result = await pool.query(`SELECT * FROM users`);
    return result;
}


const getSingleUser = async (id: string) => {
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id])
    return result;
}


const updateSingleUser = async (id: string, name: string, email: string) => {
    const result = await pool.query(`UPDATE USERS SET name = $1, email = $2 WHERE id = $3 RETURNING *`, [name, email, id])
    return result;
}

const deleteSingleUser = async (id: string) => {
    const result = await pool.query(`DELETE FROM USERS WHERE id = $1 RETURNING *`, [id])
    return result
}


export const userService = { deleteSingleUser, createUser, getUsers, getSingleUser, updateSingleUser };