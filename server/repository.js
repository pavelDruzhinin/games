const db = require('./db');

class BaseRepository {
    constructor(tableName) {
        this._tableName = tableName;
        this._dbProvider = new db.MemoryDbProvider();
    }

    async get() {
        try {
            const data = await this._dbProvider.getData(this._tableName);
            return !data ? [] : data;
        } catch (error) {
            console.log('data get error:', error);
            return [];
        }
    }

    async getById(id) {
        return await this.get().find(x => x.id == id);
    }

    async getBy(predicate) {
        if (typeof predicate != 'function')
            throw new Error(`Error: ${predicate} is not function`);

        const data = await this.get();

        return data.filter(predicate);
    }

    async add(row) {
        let data = await this.get();

        if (data.some(x => x.id == row.id))
            throw new Exception(`BaseRepository: record with ${row.id} is exist`);

        let lastId = data.length > 0 ? data[data.length - 1].id : 0;

        row.id = ++lastId;

        data.push(row);

        await this._dbProvider.writeData(this._tableName, data);

        return lastId;
    }

    async update(row) {
        let data = await this.get();
        const index = data.indexOf(row);
        if (index == -1)
            throw new Exception(`BaseRepository: record with ${row.id} is not exist`);

        data[index] = row;

        await this._dbProvider.writeData(this._tableName, data);
    }

    async delete(row) {
        let data = await this.get();
        const index = data.indexOf(row);
        if (index == -1)
            throw new Exception(`BaseRepository: record with ${row.id} is not exist`);

        data.splice(index, 1);

        await this._dbProvider.writeData(this._tableName, data);
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

    async connect(matchId, userId) {
        let data = await this.get();
        if (data.some(x => x.matchId == matchId && x.userId == userId))
            throw new Exception(`MatchUsersRepository: connect with matchId ${matchId} and userId ${userId} is exist`);

        const connectUser = { matchId: matchId, userId: userId };
        data.push(connectUser);

        await this._dbProvider.writeData(this._tableName, data);

        return connectUser;
    }

    async disconnect(matchId, userId) {
        let data = await this.get();
        console.log('disconnect data:', data);
        const rows = data.filter(x => x.matchId == matchId && x.userId == userId);
        console.log('disconnect rows:', rows);
        console.log('disconnect match:', matchId, userId);

        if (!rows.length)
            throw new Exception(`MatchUsersRepository: connect with matchId ${matchId} and userId ${userId} is not exist`);

        const index = data.indexOf(rows[0]);
        data.splice(index, 1);

        await this._dbProvider.writeData(this._tableName, data);
    }
}

class MatchStatesRepository extends BaseRepository {
    constructor() {
        super('MatchStates');
    }

    async getByMatchId(matchId) {
        return this.getBy(x => x.matchId == matchId);
    }
}

module.exports = {
    BaseRepository,
    UsersRepository,
    MatchesRepository,
    MatchUsersRepository,
    MatchStatesRepository
}