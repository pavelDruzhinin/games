import http from "./http";
import { MathLib, GameStorage } from "../game-framework";

class NakamaClient {
    gameStorage: GameStorage;

    constructor() {
        this.gameStorage = new GameStorage();
        this.connect();
    }

    connect() {
        if (this.gameStorage.session) {
            return;
        }

        let userId = this.gameStorage.userId;
        if (!userId)
            userId = MathLib.getRandomInt(8).toString();

        const payload = { userId: userId };

        http.get('/api/check').then((response: any) => {
            console.info(`Successfully authenticated:`, response);
            // this.gameStorage.userId = userId;
            // this.gameStorage.session = session;
        });
    }
}

export default NakamaClient;