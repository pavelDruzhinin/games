import { BaseComponent } from "./BaseComponent";

class Match {
    id: number
    name: string
}

class MatchComponent extends BaseComponent {
    _match: Match;

    constructor(match: Match) {
        super();
        this._match = match;
    }

    render() {
        const buttonId = `join_to_match_${this._match.id}`;

        return `<div class="match">${this._match.name} <button type="button" id="${buttonId}">Join</button></div>`;
    }

    registerEvents() {
        const buttonId = `join_to_match_${this._match.id}`;

        document.getElementById(buttonId)
            .addEventListener('click', (event) => {
                console.log('join click');
            });
    }
}

export { MatchComponent, Match };