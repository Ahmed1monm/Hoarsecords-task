import {DLQ, logger} from "../clients";

export async function taskWorkerHandler(job) {
    logger.info(`[Task] Processing task: ${job.id}`);
    logger.info(`[Task] Task payload: ${JSON.stringify(job.data.payload)}`);

    // Simulate task failure
    if (job.data.payload?.shouldFailInProcessing) {
        throw new Error(`[Error] Failed to process task ${job.id}`);
    }
    // Simulate heavy processing by sleeping for 5 seconds
    await new Promise(resolve => setTimeout(resolve, 5000));

    logger.info(`[Task] Task ${job.id} processed successfully`);
}

export async function dlqWorkerHandler(job) {
    logger.info(`[DLQ] Processing failed task: ${job.id} in DLQ`);
    logger.info(`[DLQ] Task payload: ${JSON.stringify(job.data.payload)}`);
    // Simulate heavy processing by sleeping for 5 seconds
    await new Promise(resolve => setTimeout(resolve, 5000));
    logger.info(`[DLQ] Failed task ${job.id} processed successfully in DLQ`);
}


export async function onSuccessTaskHandler(job) {
    logger.info(`Task ${job.id} completed successfully`);
}

export async function onFailedTaskHandler(job, err) {
    logger.error(`Task ${job.id} failed: ${err.message}`);
    try {
        if(job.attemptsMade >= job.opts.attempts) {
            logger.info(`Adding failed task with ID ${job.id} to DLQ`);
            await DLQ.add('failedToProcessedTask', {
                type: job.name,
                payload: job.data,
                error: err.message
            });
        }
    } catch (error) {
        logger.error(`Failed to add failed job with ID ${job.id} to DLQ: ${error.message}`);
    }
}
