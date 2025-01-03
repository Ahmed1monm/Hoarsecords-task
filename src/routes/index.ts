import {Router} from "express";

import {tasksRouter} from "./tasks";

const v1Router = Router();

v1Router.use("/tasks", tasksRouter);

export default v1Router;
