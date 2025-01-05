# Setup:
- Make sure you have Docker installed on your machine.
- Run the following command to build the docker image:

```bash
  docker-compose up --build
```

- The application will be available at `http://localhost:8000`

- If you don't have Docker installed, follow the instructions below:
- - install the dependencies by running the following command:
```bash
  npm install
```
- - Run Redis on port 6379
- - Run the application by running the following command:
```bash
  npm start
```
- You can create .env file and add the following variables:
```bash
    PORT:8000
    BULL_WORKER_ATTEMPTS:3
    REDIS_HOST:localhost
    REDIS_PORT:6379
``` 
- - The application will be available at `http://localhost:8000`
- - You can run the tests by running the following command:
```bash
  npm test
```
--------
## Test The API:
- You can run the APIs using postman by importing the following collection:
```bash
  Hoarsecords-postman.json
```
- In create task API, to simulate the failure, you can pass one of the following as a query parameter:
```bash
  shouldFailFast=true // to fail the task in the API level, will return error and try to add the task to the DLQ
  shouldFailInProcessing=true // to fail the task in the processing level, will return error and try to add the task to the DLQ
```
-------
## Monitoring:
- You can monitor the jobs via **Arena Dashboard** by visiting the following URL:
```bash
  http://localhost:4567
```
You can access the dashboard of the 2 queues, each queue has its own dashboard represents the job statuses, and you can view each job with its data

--------
## Notes:
- We have two queues, one for tasks, and another one is a dead letter queue.
- The task will be retried for specific configured (5 by default in the code and 3 in the docker env) attempts, and if it fails, it will be moved to the dead letter queue.
- If the task failed in the Tasks queue, bullMQ will trigger failed event and this event handler will move the task to the dead letter queue.
