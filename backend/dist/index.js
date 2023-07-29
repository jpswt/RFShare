import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema';
import { Query, Mutation } from './resolvers';
import { PrismaClient } from '@prisma/client';
import express from 'express';
import cors from 'cors';
const PORT = 4001;
const app = express();
app.use(cors(), express.json());
export const prisma = new PrismaClient();
const apolloServer = new ApolloServer({
    typeDefs,
    resolvers: {
        Query,
        Mutation,
    },
});
const { url } = await startStandaloneServer(apolloServer, {
    context: async () => ({
        prisma,
    }),
});
console.log(`Server ready at ${url}gql`);
