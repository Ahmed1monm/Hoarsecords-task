import {Request, Response} from "express";
import {taskQueue, DLQ, logger} from "../clients";
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
    const {type, payload, visibility_time} = req.body;
    const {shouldFailInProcessing, shouldFailFast} = req.query;
    const delay = calculateDelay(visibility_time);

    try {
        if (shouldFailFast) {
            throw new Error('Failed to add task to queue');
        }
        payload.shouldFailInProcessing = shouldFailInProcessing;
        const task = await taskQueue.add(type, {type, payload}, {delay});
        return res.status(201).json({id: task.id, status: "Task added to queue"});
    } catch (e) {
        const dlqJob = await DLQ.add('failedToAddTask', { type, payload, error: e.message });
        logger.error(`Error adding task to queue: ${e.message} and added to DLQ with id: ${dlqJob.id}`);
        res.status(500).json({error: e.message});
    }
}
