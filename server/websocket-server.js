const WebSocket = require("ws");

// Create a WebSocket server
// const wss = new WebSocket.Server({ port: 8080 }); // WebSocket server will listen on port 8080
const wss = new WebSocket.Server({ port: 3000 }); // WebSocket server will listen on port 8080

// Set up event listeners for WebSocket connections
wss.on("connection", function connection(ws) {
  console.log("Client connected");

  // Send a notification to the client every 5 seconds
  const interval = setInterval(() => {
    ws.send(JSON.stringify({ message: "New notification!" }));
  }, 5000);

  // Handle client disconnection
  ws.on("close", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});
