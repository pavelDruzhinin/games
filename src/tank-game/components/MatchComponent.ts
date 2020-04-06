import { BaseComponent } from "./BaseComponent";
import { GameStorage } from "../game-framework";
import Client from "../realtime-server/client";
import { GameData, GameEventType } from "../realtime-server/GameData";

class Match {
    id: number
    name: string
}

class MatchComponent extends BaseComponent {
    _match: Match;
    _storage: GameStorage;
    _client: Client;

    constructor(match: Match, private _joinMatch: (matchId: number) => void) {
        super();
        this._match = match;
        this._storage = new GameStorage();
        this._client = Client.instance;
    }

    render() {
        const buttonId = `join_to_match_${this._match.id}`;
        const isJoin = this._storage.matchId == this._match.id;
        const buttonText = isJoin ? 'Unjoin' : 'Join';

        return `<div class="match">${this._match.name} <button type="button" id="${buttonId}">${buttonText}</button></div>`;
    }

    registerEvents() {
        const buttonId = `join_to_match_${this._match.id}`;

        document.getElementById(buttonId)
            .addEventListener('click', (event) => {
                console.log('join click', this._storage.userId);

                if (!isNaN(this._storage.matchId) && this._storage.matchId != 0) {
                    const matchId = this._storage.matchId;
                    this._client.disconnect(matchId, this._storage.userId)
                        .then((response: any) => {
                            const previousButtonId = `join_to_match_${matchId}`;
                            console.log(previousButtonId);
                            document.getElementById(previousButtonId).innerText = 'Join';
                            this._client.sendGameData(new GameData(this._storage.userId, GameEventType.UnJoinPlayer));
                            this._joinMatch(matchId);
                        });
                }

                if (this._storage.matchId == this._match.id) {
                    this._storage.matchId = 0;
                    return;
                }

                this._client.connect(this._match.id, this._storage.userId, () => {
                    const position = this._joinMatch(this._match.id);
                    this._client.sendGameData(new GameData(this._storage.userId, GameEventType.JoinPlayer, position));

                }).then((response: any) => {
                    console.log(response);

                    document.getElementById(buttonId).innerText = 'Unjoin';
                    this._storage.matchId = this._match.id;
                });
            });
    }
}

export { MatchComponent, Match };