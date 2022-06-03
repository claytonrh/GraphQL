import { gql } from "apollo-server-express";

const typeDefs = gql `
    interface List {
        items: [Node!]!
        totalitems: Int!
    }

    enum ListSortmentEnum {
        ASC
        DESC
    }

    input ListSort {
        sorter: String!
        sortment:LIstSortmentEnum!
    }
`;


export const ListSortmentEnum = Object.freeze({
  ASC: 'ASC',
  DESC: 'DESC',
});