// planning.js

// A simple task queue
class TaskQueue {
  constructor() {
    this.queue = [];
    this.isProcessing = false;
  }

  // Add a task to the queue
  addTask(task, delay) {
    this.queue.push({ task, delay });
    this.processQueue();
  }

  // Process tasks in the queue
  processQueue() {
    if (this.isProcessing) return;
    this.isProcessing = true;

    const processNextTask = () => {
      if (this.queue.length === 0) {
        this.isProcessing = false;
        return;
      }

      const { task, delay } = this.queue.shift();
      setTimeout(() => {
        task();
        processNextTask();
      }, delay);
    };

    processNextTask();
  }
}

// Usage example
const taskQueue = new TaskQueue();

// Define some example tasks
const task1 = () => console.log('Task 1 executed');
const task2 = () => console.log('Task 2 executed');
const task3 = () => console.log('Task 3 executed');

// Add tasks to the queue with different delays
taskQueue.addTask(task1, 1000); // Execute after 1 second
taskQueue.addTask(task2, 2000); // Execute after 2 seconds
taskQueue.addTask(task3, 3000); // Execute after 3 seconds

module.exports = TaskQueue;
