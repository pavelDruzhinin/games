/// <reference path="../../../node_modules/@heroiclabs/nakama-js/dist/index.d.ts" />
// <script src="path/to/nakama-js.umd.js"></script>
import { Client } from "@heroiclabs/nakama-js";

class NakamaClient {
    private _client: any;
    constructor() {
        this._client = this.connect();
    }

    connect() {
        const client = new Client("defaultkey", "95.216.171.225", '7350');
        client.useSSL = true;

        return client;
    }
}

export default NakamaClient;