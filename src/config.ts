import * as path from "path";
import dotenv from "dotenv";

dotenv.config();
const root_dir = path.join(__dirname, "..");
const redisConnection = {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD || undefined,
}

const config = {
    root_dir,
    port: process.env.PORT || 8000,
    redisConnection,
    queuesConfig:{
        defaultJobOptions: {
            backoff: {
                type: 'exponential',
            },
            attempts: 5,
            removeOnComplete: false,
            removeOnFail: false,
        },
        connection: redisConnection
    }
};

export default config;
