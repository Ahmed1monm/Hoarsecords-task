import {Request, Response} from "express";
import {DLQ, logger} from "../clients";

/*
* @api {get} /api/v1/dlq List all tasks in DLQ
* @apiName ListDLQ
* @apiGroup DLQ
* */
export async function getTasksFromDLQ(req: Request, res: Response) {
    try {
        const jobs = await DLQ.getJobs(['waiting', 'active', 'completed', 'failed']);
        const dlqTasks = jobs.map(job => ({
            id: job.id,
            type: job.name,
            payload: job.data,
            error: job.failedReason || job.data.error,
        }));

        return res.status(200).json(dlqTasks);
    } catch (error) {
        logger.error('Failed to fetch DLQ tasks:', error.message);
        return res.status(500).json({ status: 'Error fetching DLQ tasks' });
    }
}

/*
* @api {delete} /api/v1/dlq Empty DLQ
* @apiName EmptyDLQ
* @apiGroup DLQ
* */
export async function emptyDLQ(req: Request, res: Response) {
    try {
        const jobs = await DLQ.getJobs(['waiting', 'active', 'completed', 'failed']);
        await Promise.all(jobs.map(job => job.remove()));

        return res.status(200).json({ status: 'DLQ cleared' });
    } catch (error) {
        logger.error('Failed to clear DLQ:', error.message);
        return res.status(500).json({ status: 'Error clearing DLQ' });
    }
}
