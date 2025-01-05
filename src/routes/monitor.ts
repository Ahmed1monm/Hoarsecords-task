import {Router} from "express";
import {arena} from "../controllers";

export const qMonitorRouter = Router();

qMonitorRouter.get("/", arena);
