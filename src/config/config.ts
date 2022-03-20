import dotenv from 'dotenv';
import joi from 'joi';

dotenv.config();

interface Config {
    server: {
        port: number;
    },
    mongo: {
        port: number;
        username: string;
        password: string;
        serviceName: string;
        databaseName: string;
        authDatabase: string;
        express: {
            port: number;
        }
    },
    redis: {
        port: number;
        host: string;
        password: string;
    },
    nbp: {
        url: string;
    },
    heroku: {
        url: string;
    }
}

const envVarsSchema = joi
    .object({
        ZOMBIE_API_PORT: joi.number().default(3000),
        MONGO_INITDB_ROOT_USERNAME: joi.string().required(),
        MONGO_INITDB_ROOT_PASSWORD: joi.string().required(),
        MONGO_INITDB_DATABASE: joi.string().required(),
        MONGO_SERVICE_NAME: joi.string().required(),
        MONGO_AUTH_DATABASE: joi.string().required(),
        MONGO_PORT: joi.number().default(27017),
        MONGO_EXPRESS_PORT: joi.number().default(8081),
        REDIS_PORT: joi.number().default(6379),
        REDIS_HOST: joi.string().required(),
        REDIS_PASSWORD: joi.string().required(),
        NBP_URL: joi.string().required(),
        HEROKU_URL: joi.string().required(),
    })
    .unknown()
    .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const config: Config = {
    server: {
       port: envVars.ZOMBIE_API_PORT
    },
    mongo: {
        port: envVars.MONGO_PORT,
        username: envVars.MONGO_INITDB_ROOT_USERNAME,
        password: envVars.MONGO_INITDB_ROOT_PASSWORD,
        serviceName: envVars.MONGO_SERVICE_NAME,
        databaseName: envVars.MONGO_INITDB_DATABASE,
        authDatabase: envVars.MONGO_AUTH_DATABASE,
        express: {
            port: envVars.MONGO_EXPRESS_PORT,
        }
    },
    redis: {
        port: envVars.REDIS_PORT,
        host: envVars.REDIS_HOST,
        password: envVars.REDIS_PASSWORD,
    },
    nbp: {
        url: envVars.NBP_URL
    },
    heroku: {
        url: envVars.HEROKU_URL
    }
}

export default config;