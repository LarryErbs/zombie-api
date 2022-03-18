import path from 'path';
import { DataSourceOptions } from 'typeorm';

export default {
    name: 'default',
    type: 'mongodb',
    database: 'zombies',
    synchronize: true,
    authSource: 'admin',
    username: 'admin',
    password: 'admin',
    migrationsRun: true,
    dropSchema: false,
    entities: [path.join(__dirname, '..', 'entities', '**', '*.*'), path.join(__dirname, '..', 'entities', '*.*')],
    migrations: [path.join(__dirname, 'migrations', '*.*')],
    cli: {
        entitiesDir: path.join(__dirname, '..', 'entities'),
        migrationsDir: path.join(__dirname, 'migrations'),
    },
    
} as DataSourceOptions;
