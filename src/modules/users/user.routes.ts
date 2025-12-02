import express, { Request, Response }  from 'express';
import loggerMiddleware from '../../middleware/logger';
import { pool } from '../../config/db';
import { userControllers } from './user.controller';
const router  = express.Router();


router.post("/", loggerMiddleware, userControllers.createUser)


router.get("/", loggerMiddleware, userControllers.getUser)


export const userRoutes = router;