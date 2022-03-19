import { FastifyReply, FastifyRequest } from 'fastify';
import { Zombie } from '../../../common/mongo/entities/zombie';
import { AddZombie } from '../../../features/zombie/add-zombie';
import { DeleteZombie } from '../../../features/zombie/delete-zombie';
import { GetZombies } from '../../../features/zombie/get-zombies';
import { ParamsRequest } from '../../../features/zombie/models/params-request';
import { UpdateZombie } from '../../../features/zombie/update-zombie';

export const get = async (req: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const result = await new GetZombies().handle();
    reply.send(result);
};

export const post = async ({ body }: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const result = await new AddZombie().handle(body as Zombie);
    reply.send(result);
};

export const put = async ({ body }: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const result = await new UpdateZombie().handle(body as Zombie);
    reply.send(result);
};

export const del = async ({ params }: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const result = await new DeleteZombie().handle(params as ParamsRequest);
    reply.send(result);
};
