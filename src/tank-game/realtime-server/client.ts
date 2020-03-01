/// <reference path="..\\..\\..\\node_modules\\@heroiclabs\\nakama-js\\dist\\client.d.ts" />

class NakamaClient {
    private _client: any;
    constructor() {
        this._client = this.connect();
    }

    connect() {
        const client = new nakamajs.Client("defaultkey", "95.216.171.225", 7350);
        client.ssl = true;

        return client;
    }
} 