import {Router} from "express";

import {emptyDLQ, getTasksFromDLQ} from "../controllers";

export const dlqRouter = Router();

dlqRouter.get("/", getTasksFromDLQ);
dlqRouter.delete("/", emptyDLQ);
