import http from "./http";
import { MathLib, GameStorage } from "../game-framework";
import { Client, Session } from "@heroiclabs/nakama-js";
import { DefaultSocket } from "@heroiclabs/nakama-js/dist/socket";

class NakamaClient {
    gameStorage: GameStorage;
    private _socket: DefaultSocket;

    constructor() {
        this.gameStorage = new GameStorage();
        this.connect();
    }

    connect() {
        if (this.gameStorage.session) {
            this.connectToSocket();
            return;
        }

        let userId = this.gameStorage.userId;
        if (!userId)
            userId = MathLib.getRandomInt(1000).toString();

        const payload = { userId: `some-user-${userId}` };

        http.post('/api/users', payload).then((response: any) => {
            console.info(`Successfully authenticated:`, response);
            this.gameStorage.userId = payload.userId;
            this.gameStorage.session = response.data;
            this.connectToSocket();
            this.getMatches(response.data);
        });
    }

    getMatches(session: Session) {
        http.post('/api/matches', session)
            .then((response: any) => {
                console.log(response);
            });
    }

    connectToSocket() {
        const useSSL = false;
        const verboseLogging = false;
        // Send presence events to subscribed users.
        const createStatus = false;
        this._socket = this._createClient().createSocket(useSSL, verboseLogging) as DefaultSocket;
        console.log(this._socket);

        var session = this.gameStorage.session; // obtained by authentication.
        this._socket.connect(session, createStatus).then((session) => {
            console.log('socket session', session);
            this.createMatch();
        });
    }

    createMatch() {
        this._socket.send({ match_create: {} })
            .then((response: { match: any }) => {
                console.log("Created match with ID:", response.match);
                this.gameStorage.matchId = response.match.match_id;
                this.addOpponentToMatch(response.match.match_id);
            });
    }

    addOpponentToMatch(matchId: string) {
        const session = this.gameStorage.session;
        this._socket.send({ match_join: { match_id: matchId, token: session.token } })
            .then((response: { match: { self: { user_id: string }, presences: [{ user_id: string, username: string }] } }) => {
                console.log("match join", response.match);
                var match = response.match;
                match.presences.forEach((opponent) => {
                    console.log("User id %o, username %o.", opponent.user_id, opponent.username);
                });
            });
    }

    _createClient() {
        const client = new Client("defaultkey", "95.216.171.225", '7350');
        client.useSSL = true;
        return client;
    }
}

export default NakamaClient;