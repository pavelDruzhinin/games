import { BaseComponent } from "./BaseComponent";
import { MatchComponent, Match } from "./MatchComponent";

class MatchesComponent extends BaseComponent {
    _components: MatchComponent[];
    constructor(private _elementId: string, private _matches: Match[], private _joinMatch: (matchId: number) => void) {
        super();
    }

    render() {
        this._components = this._matches.map(x => new MatchComponent(x, this._joinMatch));

        document.getElementById(this._elementId).innerHTML = this._components.map(x => x.render()).join('');
        this._components.forEach(x => x.registerEvents());
    }

    update(matches: Match[]) {
        this._matches = matches;

        this._clear();
        this.render();
    }

    add(match: Match) {
        this._matches.push(match);

        this.update(this._matches);
    }

    _clear() {
        document.getElementById(this._elementId).innerHTML = "";
    }
}

export default MatchesComponent;