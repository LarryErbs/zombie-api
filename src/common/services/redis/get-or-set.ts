import using from '../../disposable';
import { RedisKey, RedisService } from './redis-service';

export type NotInCache<T> = [getValFun: () => Promise<T>, expiration: number];

export const getOrSet = async <T>(
    key: RedisKey,
    [genValFun, expiration]: NotInCache<T>,
    serializeCallback?: (value: T) => string,
    deserializeCallback?: (keyValue: string) => T,
): Promise<T> => {
    let result!: T;

    await using(new RedisService(), async (rs: RedisService) => {
        const keyValue = await rs.get(key);
        if (!keyValue) {
            result = await genValFun();
            rs.set(key, serializeCallback?.(result) ?? JSON.stringify(result), expiration);
        } else {
            result = deserializeCallback?.(keyValue) ?? JSON.parse(keyValue);
        }
    });

    return result;
};
