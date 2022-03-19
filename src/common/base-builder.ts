export interface IBaseBuilder<T> {
    getResult(): Promise<T>;
}

export abstract class BaseBuilder<T> implements IBaseBuilder<T> {
    protected result: T;

    constructor(TCreator: { new (): T }) {
        this.result = new TCreator();
    }

    abstract build(): void;

    getResult = async (): Promise<T> => {
        this.build();
        return this.result;
    }

}