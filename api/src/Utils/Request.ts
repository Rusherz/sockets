import { FastifyRequest } from '../controllers/v1/node_modules/fastify';

export interface Request extends FastifyRequest {
	clientId: string
}