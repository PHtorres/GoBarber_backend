import Redis, { Redis as RedisClient } from 'ioredis';
import ICacheProvider from '../models/ICacheProvider';
import cacheConfig from '../../../../../config/cache';
import { json } from 'express';
import { da } from 'date-fns/locale';

export default class RedisCacheProvider implements ICacheProvider {

    private client: RedisClient;

    constructor() {
        this.client = new Redis(cacheConfig.config.redis);
    }

    public async save(key: string, value: any): Promise<void> {
        this.client.set(key, JSON.stringify(value));
    }

    public async recover<T>(key: string): Promise<T | null> {
        const data = await this.client.get(key);
        if (!data) {
            return null;
        }

        return JSON.parse(data) as T;
    }

    public async invalidate(key: string): Promise<void> {

    }

    public async invalidatePrefix(prefixo: string): Promise<void> {

        const keys = await this.client.keys(`${prefixo}:*`);
        const pipeline = this.client.pipeline();
        keys.forEach(key => {
            pipeline.del(key);
        });

        await pipeline.exec();
    }
}
