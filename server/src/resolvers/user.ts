import {
  Arg,
  Int,
  Mutation,
  Query,
  Resolver,
  Field,
  ObjectType,
  Ctx,
} from 'type-graphql';
import argon2 from 'argon2';
import { v4 } from 'uuid';

import { User } from '../entity/User';
import { MyContext } from '../types';
import { COOKIE_NAME, FORGOT_PASSWORD } from '../constants';
import CreateUserInput from './CreateUserInput';
import { validateRegisteredUser } from '../utils/validateRegisteredUser';
import { sendEmail } from '../utils/sendEmail';

@ObjectType()
export class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext): Promise<User | null> {
    if (!req.session.userId) {
      return null;
    }
    return await User.findOne({ where: { id: req.session.userId } });
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg('email', () => String) email: string,
    @Ctx() { req, redis }: MyContext
  ): Promise<Boolean> {
    const user = await User.findOne({ where: { email } });
    console.log(user);
    if (!user) {
      return true;
    }

    const token = v4();
    await redis.set(
      FORGOT_PASSWORD + token,
      user.id,
      'ex',
      1000 * 60 * 60 * 24 * 3
    );

    await sendEmail(
      email,
      `<a href="http://localhost:3000/change-password/${token}">Reset password</a>`
    );
    return true;
  }

  @Mutation(() => UserResponse)
  async changePassword(
    @Arg('token') token: string,
    @Arg('newPassword') newPassword: string,
    @Ctx() { redis }: MyContext
  ) {
    if (newPassword.length <= 6) {
      return {
        errors: [
          {
            field: 'newPassword',
            message: 'Password cannot be less that 6 characters',
          },
        ],
      };
    }

    const userId = await redis.get(FORGOT_PASSWORD + token);
    if (!userId) {
      return {
        errors: [
          {
            field: 'token',
            message: 'Token expired',
          },
        ],
      };
    }

    const user = await User.findOne({ where: { id: parseInt(userId) } });
    if (!user) {
      return {
        errors: [
          {
            field: 'token',
            message: 'User does not exist anymore',
          },
        ],
      };
    }

    user.password = await argon2.hash(newPassword);
    await user.save();
    await redis.del(FORGOT_PASSWORD + token);
    return { user };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext): Promise<Boolean> {
    return new Promise((resolve, reject) =>
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log('Failed to logout', err);
          reject(false);
        } else {
          resolve(true);
        }
      })
    );
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg('options') options: CreateUserInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const errors = validateRegisteredUser(options);
    if (errors) {
      return { errors };
    }

    try {
      const hashedPassword = await argon2.hash(options.password);
      const user = User.create({
        email: options.email,
        password: hashedPassword,
      });
      await user.save();
      req.session.userId = user.id;
      return { user };
    } catch (error) {
      console.error('Error while registering new user', error);
      if (error.detail.includes('already exists')) {
        return {
          errors: [
            {
              field: 'email',
              message: 'User already exists',
            },
          ],
        };
      } else {
        return {
          errors: [
            {
              field: 'email',
              message: error.message,
            },
          ],
        };
      }
    }
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('options') options: CreateUserInput,
    @Ctx() { req, res }: MyContext
  ): Promise<UserResponse> {
    try {
      const user = await User.findOne({ where: { email: options.email } });
      if (!user) {
        return {
          errors: [
            {
              field: 'email',
              message: 'User does not exist',
            },
          ],
        };
      }

      const valid = await argon2.verify(user.password, options.password);
      if (!valid) {
        return {
          errors: [
            {
              field: 'password',
              message: 'Invalid password',
            },
          ],
        };
      }
      req.session.userId = user.id;

      return { user };
    } catch (error) {
      console.error('Error while loggin in user', error);
    }
  }
}
