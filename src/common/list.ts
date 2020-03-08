export class List<T> extends Array<T> {

    any(func?: (value: T, index: number, array: T[]) => any): boolean {
        if (func == null)
            return this.length > 0;

        return this.filter(func).length > 0;
    }

    firstIndex(func?: (value: T) => boolean): number {
        for (let i = 0; i < this.length; i++) {
            const bool = func(this[i]);
            if (bool) {
                return i;
            }
        }
        return -1;
    }

    remove(obj: (value: T) => boolean): void;
    remove(obj: T): void;
    remove(obj: any) {
        const index = obj == "function" ? this.firstIndex(obj) : this.indexOf(obj);
        if (index == -1) return;
        this.splice(index, 1);
    }

    last() {
        return !this.length ? null : this[this.length - 1];
    }
}