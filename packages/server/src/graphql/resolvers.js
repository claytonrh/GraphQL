import { resolvers as demandResolvers } from "./Demand/Demand";
import { resolvers as nodeResolvers } from "./Node/Node";
// import { resolvers as listResolvers } from './List/List';
// import { resolvers as clientResolvers } from "./Client/Client";



const resolvers = {
    ...nodeResolvers,
    ...demandResolvers,
    // ...listResolvers,
    // ...clientResolvers,

    Query: {
        ...demandResolvers.Query,
        // ...clientResolvers.Query,
    },
};

export default resolvers;