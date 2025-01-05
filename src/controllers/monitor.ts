import Arena from 'bull-arena';
import {Queue} from "bullmq";
import config from '../config';

export const arena = Arena({
        BullMQ: Queue,
        queues: [{
            name: 'tasks',
            hostId: 'Task Queue',
            redis: config.redisConnection,
            type: 'bullmq',
        },
        {
            name: 'dead-letter-queue',
            hostId: 'Dead-Letter Queue',
            redis: config.redisConnection,
            type: 'bullmq',
        },
        ],
    }
);
