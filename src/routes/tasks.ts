import {Router} from "express";

import {createTask} from "../controllers";
import {createTaskValidator} from "../validators";

export const tasksRouter = Router();

tasksRouter.post("/", createTaskValidator, createTask)
