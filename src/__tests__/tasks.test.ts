import request from 'supertest';
import {app} from '../index';
import {DLQ, taskQueue} from "../clients";

afterEach(() => {
    return taskQueue.obliterate({force: true});
});

afterEach(() => {
    return DLQ.obliterate({force: true});
});

describe('Tasks Endpoints', () => {
    it('should create a new task', async () => {
        const res = await request(app)
            .post('/api/v1/tasks')
            .send({
                type: 'test',
                payload: {message: 'test message'},
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.status).toEqual("Task added to queue");
    });

    it('should throw validation error when type is missing', async () => {
        const res = await request(app)
            .post('/api/v1/tasks')
            .send({
                payload: {message: 'test message'},
            });
        expect(res.statusCode).toEqual(400);
    });
});

