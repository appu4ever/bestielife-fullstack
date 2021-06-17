import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { graphqlUploadExpress } from 'graphql-upload';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import { buildSchema } from 'type-graphql';
import ioRedis from 'ioredis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import cors from 'cors';

import { HelloResolver } from './resolvers/hello';
import { PetResolver } from './resolvers/pet';
import { UserResolver } from './resolvers/user';
import { COOKIE_NAME, __prod__ } from './constants';
import { MyContext } from './types';
import { BudgetResolver } from './resolvers/budget';
import { ExpenseResolver } from './resolvers/expense';

declare module 'express-session' {
  export interface SessionData {
    userId: number;
  }
}

const establishDatabaseConnection = async (): Promise<void> => {
  try {
    const connection = await createConnection();
  } catch (error) {
    console.error('Error when trying to connect to database', error.message);
  }
};

const initializeExpress = async (): Promise<void> => {
  const app = express();
  app.use('/images', express.static('images'));
  app.use(express.json());
  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );

  const RedisStore = connectRedis(session);
  const redis = new ioRedis();

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        secure: __prod__,
        sameSite: 'lax',
      },
      saveUninitialized: false,
      secret: 'lsdkpaos;al,d',
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        HelloResolver,
        PetResolver,
        UserResolver,
        BudgetResolver,
        ExpenseResolver,
      ],
      validate: false,
      dateScalarMode: 'isoDate',
    }),
    context: ({ req, res }): MyContext => ({ req, res, redis }),
    uploads: false,
  });

  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log('Server listening on port 4000');
  });
};

const initializeApp = async (): Promise<void> => {
  await establishDatabaseConnection();
  initializeExpress();
};

initializeApp();
