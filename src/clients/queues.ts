import {Queue} from 'bullmq';

const connection = {
    host: '127.0.0.1',
    port: 6379,
}

export const taskQueue = new Queue('tasks', {
    defaultJobOptions: {
        backoff: {
            type: 'exponential',
        },
        attempts: 5,
        removeOnComplete: true,
        removeOnFail: true,
    },
    connection
});

export const DLQ = new Queue('dead-letter-queue', {
    connection
});

