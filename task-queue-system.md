# Task Queue System

## **Overview**
The goal is to build a backend service that processes tasks asynchronously using a queue-based system. This service will allow tasks to be added, processed by workers, and handled efficiently with retry and error mechanisms. It must be designed for scalability and reliability.
[controllers](src/controllers)
---

## **Key Features**

### **1. Task Management**
- **Add Task**: 
  - API to add a task to the queue.
  - Tasks should include an ID, type, payload, and timestamp.
- **Task Retrieval**:
  - Workers should retrieve tasks from the queue in FIFO (First-In-First-Out) order.
- **Task Processing**:
  - Workers should process tasks asynchronously.
- **Delayed Task Visibility**:
  - Support for tasks to become visible in the queue at a specific time (e.g., after 2 hours, tomorrow at 7 PM).

### **2. Retry Logic**
- Failed tasks should be retried up to a configurable number of times.
- Implement exponential backoff for retries.
- After the retry limit, tasks should be moved to a dead-letter queue (DLQ) for further analysis.

### **3. Dead-Letter Queue (DLQ)**
- A separate queue to store tasks that failed after exhausting all retries.
- Provide an API to view and delete tasks from the DLQ.

### **4. Monitoring and Metrics** [Optional]
- Log the status of task processing (success, retry, failure).
- Provide metrics for:
  - Total tasks processed.
  - Current queue size.
  - Number of retries.
  - DLQ size.

---

## **Functional Requirements**

### **APIs**
1. **Add Task**
   - **Endpoint**: `POST /tasks`
   - **Payload**:
     ```json
     {
       "type": "string",
       "payload": "object",
       "visibility_time": "datetime" // ISO 8601 format for delayed visibility
     }
     ```
   - **Response**:
     ```json
     {
       "id": "string",
       "status": "Task added to queue"
     }
     ```

2. **View DLQ**
   - **Endpoint**: `GET /dlq`
   - **Response**:
     ```json
     [
       {
         "id": "string",
         "type": "string",
         "payload": "object",
         "error": "string"
       }
     ]
     ```

3. **Clear DLQ**
   - **Endpoint**: `DELETE /dlq`
   - **Response**:
     ```json
     {
       "status": "DLQ cleared"
     }
     ```

### **Queue Operations**
- Add tasks to an in-memory or persistent queue.
- Support message visibility timeout to avoid duplicate processing by workers.
- Support delayed visibility for tasks based on `visibility_time`.

---

## **Technical Constraints**
- Use any programming language or framework you prefer. Feel free to pick the tech stack you're comfortable with.
- [*Optional*] Include unit tests and integration tests for critical components. 

---

## **Evaluation Criteria**
1. **Functionality**: All requirements are implemented and work as expected.
2. **Code Quality**: Code is clean, well-documented, and adheres to best practices.
3. **Testing**: Adequate test coverage for all components.

---

## **Submission Guidelines**
- Provide a README with setup instructions.
- Include a brief document explaining your design decisions.
- Submit the code via a public repository (e.g., GitHub, GitLab).

---

