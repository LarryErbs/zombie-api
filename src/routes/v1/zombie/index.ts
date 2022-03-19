/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyInstance } from 'fastify';
import { addItemsSchema, deleteZombieSchema, getZombiesSchema, postZombieSchema, putZombieSchema, removeItemsSchema } from './schema';
import * as Controller from './controller';

export default async (fastify: FastifyInstance): Promise<void> => {
    fastify.get(
        '/',
        {
            schema: getZombiesSchema()
        },
        Controller.get
    );

    fastify.post<any>(
        '/',
        {
            schema: postZombieSchema()
        },
        Controller.post
    );

    fastify.put<any>(
        '/:id',
        {
            schema: putZombieSchema()
        },
        Controller.put
    );

    fastify.delete(
        '/:id',
        {
            schema: deleteZombieSchema()
        },
        Controller.del
    );

    fastify.post<any>(
        '/:id/items',
        {
            schema: addItemsSchema()
        },
        Controller.addItems
    );

    fastify.patch<any>(
        '/:id/items',
        {
            schema: removeItemsSchema()
        },
        Controller.removeItems
    );
};
