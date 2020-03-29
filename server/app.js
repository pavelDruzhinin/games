const express = require('express'),
    app = express(),
    cors = require('cors'),
    bodyParser = require('body-parser');

const WebSocket = require('ws');



var corsOptions = {
    origin: 'http://localhost:1234',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//const nakamajs = require('./nakama-js.cjs');
const repositories = require('./repository');

// class NakamaClient {
//     constructor() {
//         this._client = this.connect();
//     }
//     connect() {
//         const client = new nakamajs.Client("defaultkey", "95.216.171.225", '7350');
//         client.useSSL = true;

//         return client;
//     }

//     createUser(userId) {
//         const payload = { id: userId, create: true, username: `user_${userId}` };
//         console.log(payload);
//         return this._client.authenticateCustom(payload).then((session) => {
//             console.info(`Successfully authenticated:`, session);
//             return session;
//         });
//     }

//     listMatches(session) {
//         return this._client
//             .listMatches(session)
//             .then((response) => response);
//     }
// }

// const nakamaClient = new NakamaClient();

const usersRepository = new repositories.UsersRepository();
const matchesRepository = new repositories.MatchesRepository();
const matchUsersRepository = new repositories.MatchUsersRepository();

app.get('/api/check', (req, res) => {
    res.sendStatus(201);
});

app.post('/api/users', async (req, res) => {
    console.log('get users:', req.url, req.body);

    const user = { connectId: req.body.connectId };

    await usersRepository.add(user);
    res.send(user);
});

app.get('/api/matches', async (req, res) => {
    console.log('get matches:', req.url, req.body);

    const data = await matchesRepository.get();
    res.send(data);
});

app.get('/api/matches/:id', async (req, res) => {
    const match = await matchesRepository.getById(req.params.id);

    res.send(match);
});

app.post('/api/matches/:matchId/users/:userId', async (req, res) => {
    const matchUser = await matchUsersRepository.connect(req.params.matchId, req.params.userId);

    res.send(matchUser);
});

app.delete('/api/matches/:matchId/users/:userId', async (req, res) => {
    await matchUsersRepository.disconnect(req.params.matchId, req.params.userId);
    res.sendStatus(201);
});

app.post('/api/matches', async (req, res) => {
    console.log('post matches:', req.body);
    const match = { name: req.body.matchName };

    await matchesRepository.add(match);
    res.send(match);
});

const port = 3000;

const server = require('http').createServer(app);

const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(data) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    });
});

console.log(`proxy server run on http://localhost:${port}`);
server.listen(port);