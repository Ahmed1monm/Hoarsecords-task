import {Queue} from 'bullmq';
import config from '../config';

export const taskQueue = new Queue('tasks', {
    defaultJobOptions: {
        backoff: {
            type: 'exponential',
        },
        attempts: 5,
        removeOnComplete: false,
        removeOnFail: false,
    },
    connection: config.redisConnection
});

export const DLQ = new Queue('dead-letter-queue', {
    defaultJobOptions: {
        backoff: {
            type: 'exponential',
        },
        attempts: 5,
        removeOnComplete: false,
        removeOnFail: false,
    },
    connection: config.redisConnection
});

