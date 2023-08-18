import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { expressMiddleware as apolloMiddleWare } from '@apollo/server/express4';
import { typeDefs } from './schema';
import { Query, Mutation, Profile, Media, User } from './resolvers';
import { PrismaClient } from '@prisma/client';
import express from 'express';
import cors from 'cors';
import { decodeToken } from './utils/decodeToken';

const PORT = 4000;

const app = express();
app.use(cors(), express.json());

export interface Context {
	prisma: PrismaClient;
	userInfo: {
		userId: number;
		userName: string;
	} | null;
}

export const prisma = new PrismaClient();

const apolloServer = new ApolloServer({
	typeDefs,
	resolvers: {
		Query,
		Mutation,
		Profile,
		Media,
		User,
	},
});

await apolloServer.start();
app.use(
	'/gql',
	apolloMiddleWare(apolloServer, {
		context: async ({ req }: any): Promise<Context> => {
			// set userInfo to return req header with token info used in lib/decodeToken Function
			const userInfo = await decodeToken(req.headers.authorization);
			console.log(userInfo);
			return {
				prisma,
				userInfo,
			};
		},
	})
);

app.listen({ port: PORT }, () => {
	console.log(`Server running on port ${PORT}`);
	console.log(`Graphql endpoint is http://localhost:${PORT}/gql`);
});

// const { url } = await startStandaloneServer(apolloServer, {
// 	context: async () => ({
// 		prisma,
// 	}),
// });
// console.log(`Server ready at ${url}gql`);
