import { Router } from "express";
import loggerMiddleware from "../../middleware/logger";
import { authController } from "./auth.controller";

const router = Router()


router.post("/login", loggerMiddleware, authController.loginUser)


export const authRoutes = router;