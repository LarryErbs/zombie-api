import { FastifySchema } from 'fastify';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const getZombiesSchema = (): FastifySchema => {
    return {
        // body: {
        //     type: ''
        // }
    };
};

export const postZombieSchema = (): FastifySchema => {
    return {
        body: {
            type: 'object',
            required: ['name'],
            properties: {
                name: { type: 'string' }
            },
        },
    };
};

export const putZombieSchema = (): FastifySchema => {
    return {
        params: {
            id: { type: 'string' },
        },
        body: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                creationDate: { type: 'string' },
            },
        },
    };
};

export const deleteZombieSchema = (): FastifySchema => {
    return {
        params: {
            id: { type: 'string' },
        },
    };
};
