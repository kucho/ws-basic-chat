const ws = new WebSocket(`ws://localhost:3000`);

const generateDate = () => {
  return new Date().toLocaleTimeString("en-US", {
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  });
};

const log = document.getElementById("log");

document.querySelector("button").onclick = () => {
  const inputs = document.querySelectorAll("input");
  let broken = false;
  for (const input of inputs) {
    if (!input.checkValidity()) {
      log.innerHTML +=
        generateDate() +
        " - Error in " +
        input.getAttribute("placeholder").toLowerCase() +
        "<br>";

      broken = true;
    }
  }

  if (broken) {
    return false;
  }

  const username = document.getElementById("username").value;
  const text = document.getElementById("text").value;

  ws.send(JSON.stringify({ username, text }));
  log.innerHTML += generateDate() + " - You: " + text + "<br>";
};

document.querySelector(".alert").onclick = function () {
  this.classList.toggle("hide");
};

function notificationBubble(text) {
  const context = document.querySelector(".context");
  context.textContent = text;
  document.querySelector(".alert").classList.toggle("hide");
}

ws.onmessage = (event) => {
  const msg = JSON.parse(event.data);
  switch (msg["type"]) {
    case "chat":
      log.innerHTML +=
        generateDate() + ` - ${msg.username}: ` + msg.text + "<br>";
      break;
    case "notification":
      notificationBubble(msg.text);
      break;
  }
};

ws.onerror = (error) => {
  console.log("Server error message: ", error.message);
};
