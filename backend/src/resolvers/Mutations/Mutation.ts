import { authResolvers } from './auth';
import { mediaResolvers } from './media';

export const Mutation = {
	...mediaResolvers,
	...authResolvers,
};
