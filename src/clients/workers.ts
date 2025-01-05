import {Worker} from 'bullmq';

import config from "../config";
import {onFailedTaskHandler, onSuccessTaskHandler, taskWorkerHandler, dlqWorkerHandler} from '../services'

const taskWorker = new Worker(
    'tasks',
    taskWorkerHandler,
    {
        connection: config.redisConnection
    }
);

taskWorker.on('failed', onFailedTaskHandler);
taskWorker.on('completed', onSuccessTaskHandler);

const deadLetterQueueWorker = new Worker(
    'dead-letter-queue',
    dlqWorkerHandler,
    {
        connection: config.redisConnection
    }
);

deadLetterQueueWorker.on('failed', onFailedTaskHandler);
deadLetterQueueWorker.on('completed', onSuccessTaskHandler);
