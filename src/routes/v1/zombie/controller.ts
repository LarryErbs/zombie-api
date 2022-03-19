import { FastifyReply, FastifyRequest } from 'fastify';
import { CrudZombie } from '../../../features/zombie/crud-zombie';
import { ParamsRequestDto } from '../../../features/zombie/model/params-request-dto';
import { ZombieDto } from '../../../features/zombie/model/zombie-dto';

export const get = async (req: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const result = await new CrudZombie().getZombies();
    reply.send(result);
};

export const post = async ({ body }: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const result = await new CrudZombie().addZombie(body as ZombieDto);
    reply.send(result);
};

export const put = async ({ body, params }: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const result = await new CrudZombie().updateZombie(params as ParamsRequestDto, body as ZombieDto);
    reply.send(result);
};

export const del = async ({ params }: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const result = await new CrudZombie().deleteZombie(params as ParamsRequestDto);
    reply.send(result);
};
