import http from "./http";
import { MathLib, GameStorage } from "../game-framework";
import Session from "./session";

export default class Client {
    gameStorage: GameStorage;
    constructor() {
        this.gameStorage = new GameStorage();
    }

    getMatches() {
        return http.get('/api/matches');
    }

    addMatch(name: string) {
        const payload = { matchName: name };

        return http.post('/api/matches', payload);
    }

    addUser() {
        if (!isNaN(this.gameStorage.userId)) {
            return;
        }

        let userId = this.gameStorage.userId;
        if (!userId)
            userId = MathLib.getRandomInt(1000);

        const payload = { userId: userId };

        http.post('/api/users', payload).then((response: any) => {
            this.gameStorage.session = new Session(userId);
            this.gameStorage.userId = userId;
        });
    }

    getMatch(matchId: number) {
        return http.get(`/api/matches/${matchId}`);
    }

    connect(matchId: number, userId: number) {
        return http.post(`/api/matches/${matchId}/users/${userId}`, null);
    }

    disconnect(matchId: number, userId: number) {
        return http.delete(`/api/matches/${matchId}/users/${userId}`, null);
    }
}