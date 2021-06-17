import { Field, InputType } from 'type-graphql';

@InputType()
export default class CreateUserInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
