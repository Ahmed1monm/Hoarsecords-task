import {Router} from "express";

import {tasksRouter} from "./tasks";
import {dlqRouter} from "./dlq";
import {qMonitorRouter} from "./monitor";

const v1Router = Router();

v1Router.use("/tasks", tasksRouter);
v1Router.use("/dlq", dlqRouter);
v1Router.use("/monitor", qMonitorRouter);

export default v1Router;
