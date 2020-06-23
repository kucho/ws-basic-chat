const PORT = process.env.PORT || 3000;
const WebSocketServer = require("ws").Server; // here we are using WS library
const wss = new WebSocketServer({ port: `${PORT}` });

wss.on("connection", (ws) => {
  console.log("Connection opened 🚀");

  const sendAll = (message) => {
    wss.clients.forEach((client) => {
      if (client != ws) {
        client.send(message);
      }
    });
  };

  ws.send(
    JSON.stringify({
      type: "chat",
      username: "System",
      text: "Codeable's chat connected 🚀",
    })
  );

  sendAll(
    JSON.stringify({ type: "notification", text: "Un naco se ha conectado" })
  );

  ws.on("message", (message) => {
    sendAll(message);
  });

  ws.on("close", () => {
    console.log("Connection closed 💀");
  });
});
