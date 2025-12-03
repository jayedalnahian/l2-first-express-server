import { Request, Response } from "express";
import { todosService } from "./todos.service";

const createTodo = async (req: Request, res: Response) => {
    const { user_id, title } = req.body;
    try {
        const result = await todosService.createTodo(user_id, title)
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
}

const getAllTodos = async (req: Request, res: Response) => {
    try {
        const result = await todosService.getAllTodos()
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
}



const getSingleTodo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await todosService.getSingleTodo(id as string)
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Todo retrived successfully",
            data: result.rows[0]
        })
    } catch (error) {
        res.send(500).json({
            success: false,
            message: "Server Error"
        })
    }
}





export const todosController = { createTodo, getAllTodos, getSingleTodo }