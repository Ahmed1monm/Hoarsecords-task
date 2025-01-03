import {body} from "express-validator";
import {validationMiddleware} from "../middleware";

export const createTaskValidator = [
    body("type").isString().exists(),
    body("payload").isObject().exists(),
    body("visibility_time").isISO8601().optional(),
    validationMiddleware
];
