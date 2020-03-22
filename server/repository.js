const db = require('./db');

class BaseRepository {
    constructor(tableName) {
        this._tableName = tableName;
        this._dbProvider = new db.JsonDbProvider();
    }

    get() {
        try {
            const data = this._dbProvider.getData(this._tableName);
            return !data ? [] : data;
        } catch {
            return [];
        }
    }

    getById(id) {
        return this.get().find(x => x.id == id);
    }

    getBy(predicate) {
        if (typeof predicate != 'function')
            throw new Error(`Error: ${predicate} is not function`);

        return this.get().filter(predicate);
    }

    add(row) {
        let data = this.get();

        if (data.some(x => x.id == row.id))
            throw new Exception(`BaseRepository: record with ${row.id} is exist`);

        let lastId = data.length > 0 ? data[data.length - 1].id : 0;

        row.id = ++lastId;

        data.push(row);

        this._dbProvider.writeData(this._tableName, data);

        return lastId;
    }

    update(row) {
        throw new Exception('NotImplemented');
    }

    delete(row) {
        let data = this.get();
        const index = data.indexOf(row);
        if (index == -1)
            throw new Exception(`BaseRepository: record with ${row.id} is not exist`);

        data.splice(index, 1);

        this._dbProvider.writeData(this._tableName, data);
    }
}

class UsersRepository extends BaseRepository {
    constructor() {
        super('Users');
    }
}

class MatchesRepository extends BaseRepository {
    constructor() {
        super('Matches');
    }
}

class MatchUsersRepository extends BaseRepository {
    constructor() {
        super('MatchUsers');
    }

    connect(matchId, userId) {
        const connectUser = { matchId: matchId, userId: userId };

        let data = this.get();
        if (data.some(x => x.matchId == matchId && x.userId == userId))
            throw new Exception(`MatchUsersRepository: connect with matchId ${matchId} and userId ${userId} is exist`);

        data.push(connectUser);

        this._dbProvider.writeData(this._tableName, data);

        return connectUser;
    }
}

module.exports = {
    BaseRepository,
    UsersRepository,
    MatchesRepository,
    MatchUsersRepository
}