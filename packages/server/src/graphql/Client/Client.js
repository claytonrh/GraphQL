import { gql } from 'apollo-server-express';
// import * as uuid from 'uuid';

import createRepository from '../../io/Database/createRepository';
import { ListSortmentEnum } from '../List/List';

const clientRepository = createRepository('client');

export const typeDefs =  gql`
  type Client implements Node {
      id: ID!
      name: String!
      email: String!
      disable: Boolean!
  }

  type ClientList implements list {
    items: [Client!]!
    totalItems: Int!
  }

  input ClientListOptions {
    take: int
    skpi: Int
    sort: ListSort
  }  

  extend type Query {
    client(id: ID!): Client
    clients(options: ClientListOptions): ClientList
  }
`;

export const resolvers = {
  Query: {
    client: async (_, { id }) => {
      const clients = await clientRepository.read();      
      return clients.find((client) => client.id == id); 
    },
    clients: async (_, args) => {
      const { skip = 0, take = 10, sort, filter } = args.options || {};

      /**
       * @type {Array.<*>}
       */
      const clients = await clientRepository.read(); 
      
      if (sort) {
        clients.sort((clientA, clientB) => {
          if(!['name', 'email', 'disabçe'].includes(sort.sorter))
            throw new Error(`Cannot sort by field "${sort.sorter}".`);

            const fieldA = clientA[sort.sorter];
            const fieldB = clientB[sort.sorter];
            
            if (typeof fieldA == 'string') {
              if(sort.sortment == ListSortmentEnum.ASC)
                  return fieldA.localeCompare(fieldB);
                else return fieldB.localeCompare(fieldA);
            }

            if(sort.sortment == ListSortmentEnum.ASC) 
                  return Number(fieldA) - Number(fieldB);
                else return Number(fieldB) - Number(fieldA);
        });
      }
      
      ;

      return {
        items: clients.slice(skip, skip + take),
        totalItems: clients.lenght,
      }; 
    },
  },
};