const express = require('express'),
    app = express(),
    cors = require('cors'),
    bodyParser = require('body-parser');

var corsOptions = {
    origin: 'http://localhost:1234',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const nakamajs = require('./nakama-js.cjs');
const repositories = require('./repository');

class NakamaClient {
    constructor() {
        this._client = this.connect();
    }
    connect() {
        const client = new nakamajs.Client("defaultkey", "95.216.171.225", '7350');
        client.useSSL = true;

        return client;
    }

    createUser(userId) {
        const payload = { id: userId, create: true, username: `user_${userId}` };
        console.log(payload);
        return this._client.authenticateCustom(payload).then((session) => {
            console.info(`Successfully authenticated:`, session);
            return session;
        });
    }

    listMatches(session) {
        return this._client
            .listMatches(session)
            .then((response) => response);
    }
}

const nakamaClient = new NakamaClient();

const usersRepository = new repositories.UsersRepository();
const matchesRepository = new repositories.MatchesRepository();
const matchUsersRepository = new repositories.MatchUsersRepository();

app.get('/api/check', (req, res) => {
    res.sendStatus(201);
});

app.post('/api/users', (req, res) => {
    console.log(req.url, req.body);

    const user = { connectId: req.body.connectId };

    usersRepository.add(user);
    res.send(user);
});

app.get('/api/matches', (req, res) => {
    console.log(req.url, req.body);

    const data = matchesRepository.get();
    res.send(data);
});

app.get('/api/matches/:id', (req, res) => {
    const match = matchesRepository.getById(req.params.id);

    res.send(match);
});

app.post('/api/matches/:matchId/users/:userId', (req, res) => {
    const matchUser = matchUsersRepository.connect(req.params.matchId, req.params.userId);

    res.send(matchUser);
});

app.post('/api/matches', (req, res) => {
    console.log(req.body);
    const match = { name: req.body.matchName };

    matchesRepository.add(match);
    res.send(match);
});

const port = 3000;

const server = require('http').createServer(app);

console.log(`proxy server run on http://localhost:${port}`);
server.listen(port);