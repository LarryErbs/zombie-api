/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';

const plugin = async (fastify: FastifyInstance, opts: any, next: any) => {
    fastify.addHook('onRequest', (request: FastifyRequest, reply: FastifyReply, done: any) => {
        done();
    });

    fastify.addHook('onSend', (request: FastifyRequest, reply: FastifyReply, payload: any, done: any) => {
        done();
    });

    fastify.addHook('onResponse', (request: FastifyRequest, reply: FastifyReply, done: any) => {
        done();
    });
};

export default fp(plugin);