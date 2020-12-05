const Agenda = require("agenda");
const WebSocket = require("ws");
const { randomNumber } = require("./random-number");
const { v4: uuidv4 } = require("uuid");

const mongoDbConnection =
  "mongodb+srv://root:x@FAPexM2SP5R7D@cluster0-0trub.mongodb.net/agenda?retryWrites=true&w=majority";

const agenda = new Agenda({ db: { address: mongoDbConnection } });

agenda.define("createBox", (job) => {
  const dateNow = new Date();
  console.log(`[${dateNow.toLocaleString()}]: Try to connect web socket!`);
  const ws = new WebSocket("ws://localhost:3000");

  ws.on("open", function () {
    let randomMinuteTime = randomNumber(1, 5);
    const gameEventType = 3;
    setTimeout(function () {
      const positionX = randomNumber(1, 800);
      const positionY = randomNumber(1, 800);
      const boxType = randomNumber(0, 6);
      const interval = randomNumber(150, 300);
      const boxLocation = { positionX, positionY };
      const nextKey = uuidv4();

      const newBoxEvent = {
        type: gameEventType,
        data: {
          boxLocation,
          boxType,
          nextKey,
          interval,
        },
      };

      ws.send(JSON.stringify(newBoxEvent));
    }, randomMinuteTime * 1000);
  });

  ws.on("close", function () {
    console.log("disconnected");
  });

  console.log(`[${dateNow.toLocaleString()}]: Create new box!`);
});

async function graceful() {
  await agenda.stop();
  process.exit(0);
}

process.on("SIGTERM", graceful);
process.on("SIGINT", graceful);

(async function () {
  // IIFE to give access to async/await
  await agenda.start();
  await agenda.purge();
  await agenda.every(`5 seconds`, "createBox");
})();
