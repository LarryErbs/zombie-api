export interface Disposable {
    dispose(): Promise<void>;
}

export default async function using<T extends Disposable>(
    resource: T,
    func: (resource: T) => Promise<void>,
): Promise<void> {
    await func(resource).finally(() => resource.dispose());
}
