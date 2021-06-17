import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { PaginatedExpenses } from '../generated/graphql';

export const client = new ApolloClient({
  link: createUploadLink({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include',
  }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getExpenses: {
            keyArgs: [],
            merge(
              existing: PaginatedExpenses | undefined,
              incoming: PaginatedExpenses,
              { args }
            ): PaginatedExpenses {
              // console.log('ARGS', args);
              // console.log('INCOMING', incoming);
              // console.log('EXISTING', existing);
              return {
                ...incoming,
                expenses: [
                  ...(existing
                    ? existing.expenses.length === 0
                      ? existing.expenses
                      : args.after
                      ? existing.expenses
                      : []
                    : []),
                  ...(incoming ? incoming.expenses : []),
                ],
              };
            },
          },
        },
      },
    },
  }),
});
