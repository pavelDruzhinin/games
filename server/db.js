const fs = require('fs');
const path = require('path');

class JsonDbProvider {
    getData(tableName) {
        const filePath = this._getFileName(tableName);
        var data = fs.readFileSync(filePath, { encoding: 'utf-8' });
        return JSON.parse(data);
    }

    writeData(tableName, data) {
        const filePath = this._getFileName(tableName);
        fs.writeFile(filePath, JSON.stringify(data), (err) => { console.log(err); });
    }

    _getFileName(tableName) {
        return path.join(__dirname, tableName + '.json');
    }
}

module.exports = {
    JsonDbProvider
}