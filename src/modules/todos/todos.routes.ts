import { Router }  from "express"
import loggerMiddleware from "../../middleware/logger";
import { todosController } from "./todos.controller";

const router = Router()

router.post('/', loggerMiddleware, todosController.createTodo)


router.get('/', loggerMiddleware, todosController.getAllTodos)


router.get("/:id", loggerMiddleware, todosController.getSingleTodo)











export const todosRouter = router;

