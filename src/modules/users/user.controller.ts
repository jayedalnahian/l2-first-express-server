import { Request, Response } from "express";
import { pool } from "../../config/db";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
    const { name, email } = req.body;
    try {
        const result = await userService.createUser(name, email);
        console.log(result.rows[0]);
        res.status(201).json({
            status: 'success',
            message: 'User created successfully',
            data: result.rows[0],
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

}


const getUser = async (req: Request, res: Response) => {
   
    try {
    
            const result = await userService.getUsers();
            res.status(200).json({
                success: true,
                message: 'Users retrieved successfully',
                data: result.rows,
            })
    
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message,
    
            })
        }
    
}

export const userControllers ={ createUser, getUser };