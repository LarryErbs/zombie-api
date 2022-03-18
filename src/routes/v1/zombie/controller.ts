import { FastifyReply, FastifyRequest } from 'fastify';
import { GetZombies } from '../../../features/zombie/get-zombies';

export const get = async (req: FastifyRequest, reply: FastifyReply): Promise<void> => {
    await new GetZombies().handle();
    reply.send(['zombies']);
};

export const post = async (req: FastifyRequest, reply: FastifyReply): Promise<void> => {
    reply.send(['zombies']);
};

export const put = async (req: FastifyRequest, reply: FastifyReply): Promise<void> => {
    reply.send(['zombies']);
};

export const del = async (req: FastifyRequest, reply: FastifyReply): Promise<void> => {
    reply.send(['zombies']);
};
