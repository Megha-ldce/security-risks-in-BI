const http = require('http');
const os = require('os');
const process = require('process');

// Function to log system metrics
function logSystemMetrics() {
  const cpuUsage = os.cpus().map(cpu => cpu.times);
  const memoryUsage = process.memoryUsage();
  const uptime = process.uptime();
  
  console.log('System Metrics:');
  console.log(`CPU Usage: ${JSON.stringify(cpuUsage)}`);
  console.log(`Memory Usage: ${JSON.stringify(memoryUsage)}`);
  console.log(`Uptime: ${uptime} seconds`);
}

// Function to monitor incoming requests
function monitorRequests(server) {
  server.on('request', (req, res) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    res.on('finish', () => {
      console.log(`Response sent with status code: ${res.statusCode}`);
    });
  });
}

// Create a basic HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, World!\n');
});

// Start monitoring requests
monitorRequests(server);

// Log system metrics every minute
setInterval(logSystemMetrics, 60000);

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
