import http from "./http";
import { MathLib, GameStorage } from "../game-framework";
import Session from "./session";
import { GameData, SocketListener, GameEventType } from "./GameData";

export default class Client {
    private _gameStorage: GameStorage;
    private _webSocket: WebSocket;
    private _socketListeners: Map<GameEventType, SocketListener[]>;

    private constructor() {
        this._gameStorage = new GameStorage();
        this._socketListeners = new Map();
    }

    private static _instance: Client;
    static get instance(): Client {
        if (this._instance == null)
            this._instance = new Client();

        return this._instance;
    }

    getMatches() {
        return http.get('/api/matches');
    }

    addMatch(name: string) {
        const payload = { matchName: name };

        return http.post('/api/matches', payload);
    }

    addUser() {
        if (!isNaN(this._gameStorage.userId)) {
            return;
        }

        let userId = this._gameStorage.userId;
        if (!userId)
            userId = MathLib.getRandomInt(1000);

        const payload = { userId: userId };

        http.post('/api/users', payload).then((response: any) => {
            this._gameStorage.session = new Session(userId);
            this._gameStorage.userId = userId;
        });
    }

    getMatch(matchId: number) {
        return http.get(`/api/matches/${matchId}`);
    }

    connect(matchId: number, userId: number, afterJoinMatch: () => void) {
        return http.post(`/api/matches/${matchId}/users/${userId}`, null).then((response: any) => {
            this._webSocket = new WebSocket("ws://localhost:3000");
            console.log('connect');
            this._webSocket.onopen = (ev: Event) => {
                console.log('connected');
                afterJoinMatch();
            };

            this._webSocket.onclose = (ev: Event) => {
                console.log('disconnected');
            };

            this._webSocket.onmessage = (messageEvent) => {
                console.log(messageEvent);
                const gameData = JSON.parse(messageEvent.data) as GameData;
                const listeners = this._socketListeners.get(gameData.type);
                console.log(listeners);
                if (!listeners)
                    return;

                for (const listener of listeners) {
                    listener(gameData);
                }
            };

            this._webSocket.onerror = (error) => {
                console.log(error);
            }
        });
    }

    addSocketListener(eventType: GameEventType, listener: SocketListener) {
        let socketListeners = this._socketListeners.get(eventType);

        if (!socketListeners) {
            socketListeners = [];
            this._socketListeners.set(eventType, socketListeners);
        }

        socketListeners.push(listener);
    }

    sendGameData(data: GameData) {
        if (this._webSocket == null) {
            throw new Error('WebSocket is not connect');
        }

        //console.log('state websocket:', this._webSocket.readyState, this._webSocket.CONNECTING);
        this._webSocket.send(JSON.stringify(data));
    }

    disconnect(matchId: number, userId: number) {
        return http.delete(`/api/matches/${matchId}/users/${userId}`, null);
    }
}