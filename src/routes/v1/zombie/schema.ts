import { FastifySchema } from 'fastify';

const paramsRequest = {
    id: { type: 'string' },
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const getZombiesSchema = (): FastifySchema => {
    return {};
};

export const postZombieSchema = (): FastifySchema => {
    return {
        body: {
            type: 'object',
            required: ['name'],
            properties: {
                name: { type: 'string' },
            },
        },
    };
};

export const putZombieSchema = (): FastifySchema => {
    return {
        params: paramsRequest,
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
        params: paramsRequest,
    };
};

export const getItemsSchema = (): FastifySchema => {
    return {
        params: paramsRequest,
    };
};

export const addItemsSchema = (): FastifySchema => {
    return {
        params: paramsRequest,
        body: {
            type: 'array',
            items: {
                type: 'object',
                required: ['name', 'value'],
                properties: {
                    name: { type: 'string' },
                    value: { type: 'number' },
                },
            }
        },
    };
};

export const removeItemsSchema = addItemsSchema