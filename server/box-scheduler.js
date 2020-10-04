const Agenda = require("agenda");
const WebSocket = require("ws");

function randomRange(min, max) {
  if (typeof min !== "number")
    throw new Error("[randomRange]: min is not number");

  if (typeof max !== "number")
    throw new Error("[randomRange]: max is not number");

  return ~~(Math.random() * (max - min + 1)) + min;
}

const mongoDbConnection =
  "mongodb+srv://root:x@FAPexM2SP5R7D@cluster0-0trub.mongodb.net/agenda?retryWrites=true&w=majority";

const agenda = new Agenda({ db: { address: mongoDbConnection } });

agenda.define("createBox", (job) => {
  const ws = new WebSocket("ws://localhost:3000");
  ws.on("open", function () {
    let randomMinuteTime = randomRange(1, 5);
    setTimeout(function () {
      ws.send(JSON.stringify({ type: 3 }));
    }, randomMinuteTime * 1000);
  });

  ws.on("close", function () {
    console.log("disconnected");
  });

  const dateNow = new Date();
  console.log(`[${dateNow.toLocaleString()}]: Create new box!`);
});

(async function () {
  // IIFE to give access to async/await
  await agenda.start();

  await agenda.every(`5 seconds`, "createBox");
})();
