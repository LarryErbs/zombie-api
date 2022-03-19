import { FastifyReply, FastifyRequest } from 'fastify';
import { Zombie } from '../../../common/mongo/entities/zombie';
import { CrudZombie } from '../../../features/zombie/crud-zombie';
import { ParamsRequest } from '../../../features/zombie/models/params-request';

export const get = async (req: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const result = await new CrudZombie().getZombies();
    reply.send(result);
};

export const post = async ({ body }: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const result = await new CrudZombie().addZombie(body as Zombie);
    reply.send(result);
};

export const put = async ({ body }: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const result = await new CrudZombie().updateZombie(body as Zombie);
    reply.send(result);
};

export const del = async ({ params }: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const result = await new CrudZombie().deleteZombie(params as ParamsRequest);
    reply.send(result);
};
