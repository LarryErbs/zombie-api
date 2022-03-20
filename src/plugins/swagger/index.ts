/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import { FastifyInstance, FastifyPluginCallback } from 'fastify';
import fp from 'fastify-plugin';

const plugin: FastifyPluginCallback<Record<string, unknown>> = async (fastify: FastifyInstance) => {
    fastify.register(require('fastify-swagger'), {
        mode: 'static',
        routePrefix: '/swagger',
        exposeRoute: true,
        specification: {
            path: './build/swagger.yaml',
            postProcessor: (swaggerObject: any) => {
                return swaggerObject;
            },
        },
    });
};

export default fp(plugin);
