export class TankAmunnition {
    _ammunitions = new Map();
    _observables: any[] = [];

    constructor() {
        this.bullets = false;
        this.shrapnels = false;
    }

    get bullets() { return this._give('bullets'); }
    set bullets(value) { this._ammunitions.set('bullets', value); }
    get shrapnels() { return this._give('shrapnels'); }
    set shrapnels(value) { this._ammunitions.set('shrapnels', value); }

    add(ammunition: any) {
        for (var addShell of ammunition._ammunitions) {
            var shells = this._ammunitions.get(addShell[0]);
            if (shells == undefined) {
                console.warn(`Nonknown shells in ammunitions: ${addShell[0]}`);
                continue;
            }
            var addShells = parseInt(addShell[1]);
            this._ammunitions.set(addShell[0], shells + addShells);
        }
    }

    private _give(key: string) {
        var shells = this._ammunitions.get(key);
        if (!shells)
            return false;

        shells--;
        this.fireChangeEvent(key, shells);
        this._ammunitions.set(key, shells);
        return true;
    }

    onchange(observable: any) {
        this._observables.push(observable);
    }

    fireChangeEvent(key: string, value: any) {
        for (var observable of this._observables) {
            if (typeof observable == 'function')
                observable(key, value);
        }
    }
}