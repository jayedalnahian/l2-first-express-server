import { Request, Response } from "express";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
    
    try {
        const result = await userService.createUser(req.body);
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

};

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
};

const getSingleUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await userService.getSingleUser(id as string)
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
};

const updateSingleUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        const result = await userService.updateSingleUser((id as string), name, email)

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
};

const deleteSingleUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await userService.deleteSingleUser(id as string)
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
};




export const userControllers = { updateSingleUser, deleteSingleUser, createUser, getUser, getSingleUser };