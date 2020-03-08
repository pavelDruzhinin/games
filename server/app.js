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

app.get('/api/check', (req, res) => {
    res.sendStatus(201);
});

app.post('/api/users', (req, res) => {
    console.log(req.url, req.body);

    nakamaClient.createUser(req.body.userId).then((session) => {
        res.send(session);
    }).catch(error => {
        res.send(error);
    });
});

app.post('/api/matches', (req, res) => {
    console.log(req.url, req.body);

    nakamaClient.listMatches(req.body)
        .then((response) => {
            res.send(response);
        }).catch(error => {
            res.status(error.status).send(error);
        });
});

const port = 3000;

const server = require('http').createServer(app);

console.log(`proxy server run on http://localhost:${port}`);
server.listen(port);