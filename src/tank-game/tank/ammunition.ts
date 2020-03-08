export class TankAmunnition {
    private readonly _ammunitions = new Map<string, number>();
    private _observables: ((key: string, value: number) => void)[] = [];

    get ammunitions(): Map<string, number> {
        return this._ammunitions;
    }

    constructor() {
        this.bullets = 0;
        this.shrapnels = 0;
    }

    get bullets() { return this._give('bullets'); }
    set bullets(value) { this._ammunitions.set('bullets', value); }

    get shrapnels() { return this._give('shrapnels'); }
    set shrapnels(value) { this._ammunitions.set('shrapnels', value); }

    add(ammunition: TankAmunnition) {
        for (const addShell of ammunition._ammunitions) {
            const shells = this._ammunitions.get(addShell[0]);
            if (shells == undefined) {
                console.warn(`Nonknown shells in ammunitions: ${addShell[0]}`);
                continue;
            }
            this._ammunitions.set(addShell[0], shells + addShell[1]);
        }
    }

    private _give(key: string): number {
        let shells = this._ammunitions.get(key);
        if (!shells)
            return 0;

        shells--;
        this.fireChangeEvent(key, shells);
        this._ammunitions.set(key, shells);
        return shells;
    }

    onchange(observable: (key: string, value: number) => void) {
        this._observables.push(observable);
    }

    fireChangeEvent(key: string, value: number) {
        for (var observable of this._observables) {
            observable(key, value);
        }
    }
}