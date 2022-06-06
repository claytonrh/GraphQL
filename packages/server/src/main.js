import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

const app = express();
const PORT = process.env.PORT ? parseInt(processs.env.PORT) : 8000;
const HOSTNAME = process.env.HOSTNAME || '192.168.0.231';

// let server;

async function startServer() {
	const server = new ApolloServer({
		plugins: [
			ApolloServerPluginLandingPageGraphQLPlayground(),
		],
		typeDefs,
		resolvers,
	});

	await server.start();

	server.applyMiddleware({
		app,
		cors: {
			origin: `http://${HOSTNAME}:3000`
		},
		bodyParserConfig: true,
	});
};

startServer(app);

app.listen(PORT, HOSTNAME, () => {
	console.log(`Server listening at ${HOSTNAME}:${PORT}`);
	// console.log(`GraphQL ${server.graphqlPath}`);
});
