class TankAmunnition {
    _ammunitions = new Map();
    _observables = [];

    constructor() {
        this.bullets = 0;
        this.shrapnels = 0;
    }

    get bullets() { return this._give('bullets'); }
    set bullets(value) { this._ammunitions.set('bullets', value); }
    get shrapnels() { return this._give('shrapnels'); }
    set shrapnels(value) { this._ammunitions.set('shrapnels', value); }

    add(ammunition) {
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

    _give(key) {
        var shells = this._ammunitions.get(key);
        if (!shells)
            return false;

        shells--;
        this.fireChangeEvent(key, shells);
        this._ammunitions.set(key, shells);
        return true;
    }

    onchange(observable) {
        this._observables.push(observable);
    }
    fireChangeEvent(key, value) {
        for (var observable of this._observables) {
            if (typeof observable == 'function')
                observable(key, value);
        }
    }
}