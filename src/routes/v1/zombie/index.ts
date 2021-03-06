/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyInstance } from 'fastify';
import {
    addItemsSchema,
    deleteZombieSchema,
    exchangeItemSchema,
    getItemsSchema,
    getZombiesSchema,
    postZombieSchema,
    putZombieSchema,
    removeItemsSchema,
} from './schema';
import * as Controller from './controller';

export default async (fastify: FastifyInstance): Promise<void> => {
    fastify.get(
        '/',
        {
            schema: getZombiesSchema(),
        },
        Controller.get,
    );

    fastify.post<any>(
        '/',
        {
            schema: postZombieSchema(),
        },
        Controller.post,
    );

    fastify.put<any>(
        '/:id',
        {
            schema: putZombieSchema(),
        },
        Controller.put,
    );

    fastify.delete(
        '/:id',
        {
            schema: deleteZombieSchema(),
        },
        Controller.del,
    );

    fastify.get<any>(
        '/:id/items',
        {
            schema: getItemsSchema(),
        },
        Controller.getItems,
    );

    fastify.get<any>(
        '/:id/items/calculate',
        {
            schema: getItemsSchema(),
        },
        Controller.calculateItems,
    );

    fastify.post<any>(
        '/:id/items',
        {
            schema: addItemsSchema(),
        },
        Controller.addItems,
    );

    fastify.patch<any>(
        '/:id/items',
        {
            schema: removeItemsSchema(),
        },
        Controller.removeItems,
    );

    fastify.patch<any>(
        '/:id/items/exchange',
        {
            schema: exchangeItemSchema(),
        },
        Controller.exchangeItem,
    );
};
