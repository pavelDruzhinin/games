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
const matchStateRepository = new repositories.MatchStatesRepository();

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

    const matchId = await matchesRepository.add(match);
    const matchState = { matchId };
    const matchStateId = await matchStateRepository.add(matchState);
    console.log('add match state', matchState, matchStateId);
    res.send(match);
});

app.get('/api/matches/:matchId/states', async (req, res) => {
    const matchStates = await matchStateRepository.getByMatchId(req.params.matchId);
    const matchState = !matchStates || matchStates.length == 0 ? null : matchStates[0];
    res.send(matchState);
});

class MatchStateMachine {
    async change(jsonData) {
        const gameData = JSON.parse(jsonData);

        let gameEventTypes = ['joinPlayer', 'unJoinPlayer', 'changePosition'];
        const gameEventType = gameEventTypes[gameData.type];

        console.log('game data', gameEventTypes);
        console.log('game data', gameData);
        console.log('game event', gameEventType);

        if (!gameEventType)
            throw new Error('MatchStateMachine: not found event for type' + gameData.type);

        const matchStates = await matchStateRepository.get();
        const matchState = matchStates[0];
        if (!matchState) {
            console.log('matchStates', matchStates);
            throw new Error('MatchStateMachine: not found state for event ' + gameEventType);
        }

        await this[`_${gameEventType}`](matchState, gameData.userId, gameData.data);
    }

    async _unJoinPlayer(matchState, userId, data) {
        console.log('unjoin player', matchState, userId, data);

        delete matchState.players[userId];

        await matchStateRepository.update(matchState);
    }

    async  _joinPlayer(matchState, userId, data) {
        console.log('join player', matchState, userId, data);

        if (!matchState.players)
            matchState.players = {};

        matchState.players[userId] = { position: data };

        await matchStateRepository.update(matchState);
    }

    async  _changePosition(matchState, userId, data) {
        console.log('change position', matchState, userId, data);

        matchState.players[userId] = { position: data };

        await matchStateRepository.update(matchState);
    }
}

const matchStateMachone = new MatchStateMachine();

const port = 3000;

const server = require('http').createServer(app);

const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
    ws.on('message', async function incoming(data) {
        await matchStateMachone.change(data);

        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    });
});

console.log(`proxy server run on http://localhost:${port}`);
server.listen(port);