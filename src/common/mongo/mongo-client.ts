/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventEmitter } from 'stream';
import { connect, MongooseOptions } from 'mongoose';
import { Db } from 'mongodb';
import { isUndefined } from 'lodash';
import { Deferred } from './deferred';
import config from '../../config/config';

const createConnectionString = (): string => {
    // return `mongodb://${config.mongo.username}:${config.mongo.password}@${config.mongo.serviceName}:${config.mongo.port}/${config.mongo.authDatabase}`;
    return `mongodb://${config.mongo.username}:${config.mongo.password}@localhost:${config.mongo.port}/zombie?authSource=admin`;
}

export class MongoDbClient extends EventEmitter {
    private deferredClient: Deferred<typeof import('mongoose')>;
    private deferredDb: Deferred<Db>;
    private uri: string;
    public client: Promise<typeof import('mongoose')>;
    public db: Promise<Db>;

    constructor() {
        super();
        this.deferredClient = new Deferred<typeof import('mongoose')>();
        this.client = this.deferredClient.promise;
        
        this.deferredDb = new Deferred<Db>()
        this.db = this.deferredDb.promise;
        this.uri = createConnectionString();
        console.log(this.uri);
    }

    public async close(): Promise<void> {
        const client = await this.client;
        await client.connection.close();
        await client.disconnect();
    }

    public async connect(
        userOpts?: MongooseOptions,
        client?: typeof import('mongoose') | Promise<typeof import('mongoose')>,
    ): Promise<void> {
        const value = !isUndefined(client) ? client : await this.createClient(this.uri, userOpts)
        this.deferredClient.resolve(value);
    }

    private createClient(uri: string, userOpts?: MongooseOptions): Promise<typeof import('mongoose')> {
        return new Promise<typeof import('mongoose')>(async (resolve, reject) => {
            const opts = Object.assign({}, { useNewUrlParser: true, useUnifiedTopology: true }, userOpts);

            try {
                const client = await connect(uri, opts);
                this.emit('connected', client);
                resolve(client);
            } catch(error: any) {
                console.log(error);
                this.emit('error', error);
                reject(error);
            }
        }) 
    }
}
