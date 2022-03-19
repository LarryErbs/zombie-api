/* eslint-disable @typescript-eslint/no-explicit-any */
export class Deferred<T> {
    public promise: Promise<T>;
    public reject!: (reason?: any) => void;
    public resolve!: (value: T | PromiseLike<T>) => void;

    constructor() {
        this.promise = new Promise<T>((resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => {
            this.resolve = resolve;
            this.reject = reject;
        })
        Object.freeze(this);
    }
}