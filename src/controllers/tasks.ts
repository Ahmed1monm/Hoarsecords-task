import {Request, Response} from "express";
import {taskQueue} from "../clients/queues";
import {logger} from "../clients";
import {calculateDelay} from "../utils";

/*
* @api {post} /api/v1/tasks Create a new task
* @apiName CreateTask
* @apiGroup Tasks
*
* @apiBody {Object} task
* @apiBody {String} task.type
* @apiBody {Object} task.payload
* @apiBody {String} task.visibility_time
*
* @apiSuccess {String} id
* @apiSuccess {String} status
*
* */
export async function createTask(req: Request, res: Response) {
    try {
        const {type, payload, visibility_time} = req.body;
        const delay = calculateDelay(visibility_time);
        const task = await taskQueue.add(type, {type, payload}, {delay});
        return res.json({id: task.id, status: "Task added to queue", task});
    } catch (e) {
        logger.error("Error creating task: ", e);
        res.status(500).json({error: e.message});
    }
}
