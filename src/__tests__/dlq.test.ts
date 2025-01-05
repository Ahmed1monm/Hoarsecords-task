import request from 'supertest';
import {app} from '../index';
import {DLQ, taskQueue} from "../clients";

afterEach(() => {
    return taskQueue.obliterate({force: true});
});

afterEach(() => {
    return DLQ.obliterate({force: true});
});

describe('DLQ Endpoints', () => {
    it('should get empty list from DLQ', async () => {
        const res = await request(app).get('/api/v1/dlq');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual([]);
    });

    it('should clear the DLQ', async () => {
        await request(app)
            .post('/api/v1/tasks')
            .send({
                type: 'test',
                payload: {message: 'test message'},
            });

        const job = await taskQueue.getJobs(['active']);
        expect((await job[0].getState())).toBe('active');

        const res1 = await request(app).delete('/api/v1/dlq');
        expect(res1.statusCode).toEqual(200);
        expect(res1.body.status).toEqual('DLQ cleared');
    });
});

