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
            path: './swagger.yaml',
            postProcessor: (swaggerObject: any) => {
                // swaggerObject.host = '0.0.0.0';
                // swaggerObject.info.version = 1;
                // swaggerObject.schemas = ['http'];

                return swaggerObject;
            },
        },
    });
};

export default fp(plugin);
