import express, { Request, Response }  from 'express';
import loggerMiddleware from '../../middleware/logger';
import { userControllers } from './user.controller';
const router  = express.Router();


router.post("/", loggerMiddleware, userControllers.createUser)

router.get("/", loggerMiddleware, userControllers.getUser)


router.get("/:id", loggerMiddleware, userControllers.getSingleUser)



router.put("/:id", loggerMiddleware, userControllers.updateSingleUser)


router.delete("/:id", loggerMiddleware, userControllers.deleteSingleUser)


export const userRoutes = router;