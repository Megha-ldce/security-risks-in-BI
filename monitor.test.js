const { logSystemMetrics, monitorRequests } = require('./monitor');
const http = require('http');
const { PassThrough } = require('stream');

describe('Monitor Module', () => {
  
  test('logSystemMetrics should log metrics', () => {
    // Spy on console.log to capture output
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    // Call the function
    logSystemMetrics();

    // Check that console.log was called
    expect(consoleSpy).toHaveBeenCalled();

    // Restore the original console.log
    consoleSpy.mockRestore();
  });

  test('monitorRequests should log request details', (done) => {
    // Create a test server
    const server = http.createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Hello, Test!');
    });

    // Use a PassThrough stream to capture logs
    const logStream = new PassThrough();
    jest.spyOn(console, 'log').mockImplementation(logStream.write.bind(logStream));

    monitorRequests(server);

    // Start the server and make a request
    server.listen(0, () => {
      const port = server.address().port;

      http.get(`http://localhost:${port}`, (res) => {
        res.on('data', () => {}); // Consume response
        res.on('end', () => {
          server.close();
          logStream.end(); // End the log stream

          // Check if logs contain expected request details
          let logs = '';
          logStream.on('data', chunk => { logs += chunk.toString(); });
          logStream.on('end', () => {
            expect(logs).toMatch(/Request received: GET \//);
            expect(logs).toMatch(/Response sent with status code: 200/);
            done();
          });
        });
      });
    });
  });

});
