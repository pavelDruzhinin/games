const fs = require('fs').promises;
const path = require('path');

class JsonDbProvider {
    async getData(tableName) {
        const filePath = this._getFileName(tableName);
        var data = await fs.readFile(filePath, { encoding: 'utf-8' });
        console.log('json getData:', data);
        return JSON.parse(data);
    }

    async writeData(tableName, data) {
        const filePath = this._getFileName(tableName);
        await fs.writeFile(filePath, JSON.stringify(data), (err) => { console.log(err); });
    }

    _getFileName(tableName) {
        return path.join(__dirname, tableName + '.json');
    }
}

class MemoryDbProvider {
    constructor() {
        this._storage = {};
    }

    async getData(tableName) {
        return new Promise((resolve, reject) => {
            var data = this._storage[tableName];

            if (!data)
                resolve([]);

            resolve(data);
        });
    }

    async writeData(tableName, data) {
        return new Promise((resolve, reject) => {
            this._storage[tableName] = data;
            resolve();
        });
    }
}

module.exports = {
    JsonDbProvider,
    MemoryDbProvider
}