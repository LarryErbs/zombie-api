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
        authDatabase: string;
        express: {
            port: number;
        }
    },
    redis: {
        port: number;
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
        authDatabase: envVars.MONGO_AUTH_DATABASE,
        express: {
            port: envVars.MONGO_EXPRESS_PORT,
        }
    },
    redis: {
        port: envVars.REDIS_PORT,
    }
}

export default config;