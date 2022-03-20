import Redis from 'ioredis';
import config from '../../../config/config';

export type RedisKey = string;
export type RedisValue = string;
type RedisClient = Redis.Cluster | Redis.Redis;

export interface IRedisService {
    dispose(): Promise<void>;
    get(key: RedisKey): Promise<string | null>;
    set(key: RedisKey, value: RedisValue, expiration: number): Promise<void>;
}

export class RedisService implements IRedisService {
    private client!: RedisClient;

    async dispose(): Promise<void> {
        this.client.quit();
    }

    async get(key: string): Promise<string | null> {
        this.client = await this.connect();
        return await this.client.get(key);
    }

    async set(key: string, value: RedisValue, expiration: number): Promise<void> {
        this.client = await this.connect();
        await this.client.setex(key, expiration, value);
    }

    private async connect(): Promise<RedisClient> {
        if (this.client) return this.client;
        const redisClient = new Redis(config.redis.port, config.redis.host, {
            password: config.redis.password,
        });

        return this.attachEvents(redisClient);
    }

    private attachEvents(redisClient: RedisClient): RedisClient {
        redisClient
            .on('connect', () => console.log('Connected to redis'))
            .on('error', (error) => console.log(error))
            .on('close', () => console.log('Closing redis connection'));
        return redisClient;
    }
}
