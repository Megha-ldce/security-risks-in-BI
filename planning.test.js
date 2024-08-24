const TaskQueue = require('./planning');

describe('TaskQueue', () => {
  test('should execute tasks in order with specified delays', (done) => {
    const taskQueue = new TaskQueue();

    const executionOrder = [];
    const startTime = Date.now();

    // Define tasks
    const task1 = () => {
      executionOrder.push('task1');
    };

    const task2 = () => {
      executionOrder.push('task2');
      // Verify time elapsed between task1 and task2
      const timeElapsed = Date.now() - startTime;
      expect(timeElapsed).toBeGreaterThanOrEqual(1000);
      expect(timeElapsed).toBeLessThan(2000);
    };

    const task3 = () => {
      executionOrder.push('task3');
      // Verify time elapsed between task2 and task3
      const timeElapsed = Date.now() - startTime;
      expect(timeElapsed).toBeGreaterThanOrEqual(2000);
      expect(timeElapsed).toBeLessThan(3000);
      // Verify that tasks are executed in the correct order
      expect(executionOrder).toEqual(['task1', 'task2', 'task3']);
      done();
    };

    // Add tasks to queue with delays
    taskQueue.addTask(task1, 1000);
    taskQueue.addTask(task2, 2000);
    taskQueue.addTask(task3, 3000);
  });

  test('should handle multiple tasks with the same delay', (done) => {
    const taskQueue = new TaskQueue();

    const executionOrder = [];
    const startTime = Date.now();

    // Define tasks with the same delay
    const task1 = () => {
      executionOrder.push('task1');
    };

    const task2 = () => {
      executionOrder.push('task2');
    };

    const task3 = () => {
      executionOrder.push('task3');
      // Verify that all tasks are executed in the correct order
      const timeElapsed = Date.now() - startTime;
      expect(timeElapsed).toBeGreaterThanOrEqual(1000);
      expect(timeElapsed).toBeLessThan(2000);
      expect(executionOrder).toEqual(['task1', 'task2', 'task3']);
      done();
    };

    // Add tasks with the same delay
    taskQueue.addTask(task1, 1000);
    taskQueue.addTask(task2, 1000);
    taskQueue.addTask(task3, 1000);
  });

  test('should handle empty queue correctly', () => {
    const taskQueue = new TaskQueue();

    // No tasks to add, so nothing to check
    expect(() => {
      // Attempt to process an empty queue
      taskQueue.processQueue();
    }).not.toThrow();
  });
});
