import { MiddlewareFn } from 'type-graphql';
import { MyContext } from '../types';

export const authenticateRoute: MiddlewareFn<MyContext> = (
  { context },
  next
) => {
  const { req } = context;
  if (!req.session.userId) {
    throw new Error('not authenticated');
  }
  return next();
};
