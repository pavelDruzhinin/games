export class List<T> extends Array<T> {
    any(func?: (value: T, index: number, array: T[]) => any): boolean {

        if (func == null)
            return this.length > 0;

        return this.filter(func).length > 0;
    }
    firstIndex(func?: (value: T) => boolean): number {
        let index = -1;
        for (let i = 0; i < this.length; i++) {
            const bool = func(this[i]);
            if (bool) {
                index = i;
                break;
            }
        }
        return index;
    }
    remove(obj: T) {
        const index = typeof obj == "function" ? this.firstIndex(obj) : this.indexOf(obj);
        if (index == -1) return;
        this.splice(index, 1);
    }
    last() {
        if (!this.length)
            return null;

        return this[this.length - 1];
    }
}