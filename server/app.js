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
        return this._client.authenticateCustom(payload).then((session) => {
            console.info(`Successfully authenticated:`, session);
            this.gameStorage.userId = userId;
            this.gameStorage.session = session;
        });
    }
}

const nakamaClient = new NakamaClient();

app.get('/api/check', (req, res) => {
    res.sendStatus(201);
});

app.post('/api/users', (req, res) => {
    console.log(req.url, req.body);

    nakamaClient.createUser(req.body).then((session) => {
        res.send(session);
    }).catch(error => {
        res.sendStatus(500);
    });
});

const port = 3000;

const server = require('http').createServer(app);

console.log(`proxy server run on http://localhost:${port}`);
server.listen(port);