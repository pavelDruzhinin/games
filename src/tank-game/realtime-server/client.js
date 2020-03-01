class NakamaClient {
    constructor() {
        this._client = client;
    }

    connect() {
        const client = new nakamajs.Client("defaultkey", "95.216.171.225", 7350);
        client.ssl = true;

        return client;
    }
} 