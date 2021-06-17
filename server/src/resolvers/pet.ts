import { FileUpload, GraphQLUpload } from 'graphql-upload';
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import path from 'path';
import { getConnection } from 'typeorm';
import { Pet } from '../entity/Pet';
import { User } from '../entity/User';
import { authenticateRoute } from '../middleware/authenticateRoute';
import { ImageUpload, MyContext } from '../types';
import { createWriteStream } from 'fs';
import { FieldError } from '../resolvers/user';

@InputType()
export class CreatePetInput {
  @Field()
  name: string;

  @Field()
  breed: string;
}

@InputType()
export class UpdatePetInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  breed?: string;
}

@ObjectType()
class CreatePetResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Pet, { nullable: true })
  pet?: Pet;
}

@Resolver()
export class PetResolver {
  @Query(() => [Pet])
  async pets(
    @Arg('limit', () => Int) limit: number,
    @Arg('cursor', () => String, { nullable: true }) cursor: string | null // the first time we run it the cursoris going to be null
  ): Promise<Pet[]> {
    const realLimit = Math.min(50, limit);
    const qb = getConnection()
      .getRepository(Pet)
      .createQueryBuilder('pets')
      .take(realLimit)
      .orderBy('"createdAt"', 'DESC'); // wrap in qutations
    if (cursor) {
      qb.where('"createdAt" < :cursor', {
        cursor: new Date(parseInt(cursor)),
      });
    }
    return qb.getMany();
  }

  @Query(() => Pet, { nullable: true })
  pet(@Arg('id', () => Int) id: number): Promise<Pet | undefined> {
    return Pet.findOne({ where: { id } });
  }

  @Mutation(() => CreatePetResponse)
  @UseMiddleware(authenticateRoute)
  async createPet(
    @Arg('data') data: CreatePetInput,
    @Arg('picture', () => GraphQLUpload)
    { filename, createReadStream }: ImageUpload,
    @Ctx() { req }: MyContext
  ): Promise<CreatePetResponse> {
    const { name } = data;
    console.log(data, filename);
    if (!name) {
      return {
        errors: [
          {
            field: 'name',
            message: 'Pet name cannot be empty',
          },
        ],
      };
    }

    if (!filename) {
      return {
        errors: [
          {
            field: 'picture',
            message: 'Give us a cute photo of your bestie!!',
          },
        ],
      };
    }
    try {
      console.log(__dirname + `../../images/${filename}`);
      return await new Promise(async (resolve, reject) =>
        createReadStream()
          .pipe(createWriteStream(__dirname + `/../../images/${filename}`))
          .on('finish', async () => {
            const user = await User.findOne({
              where: { id: req.session.userId },
            });

            const pet = await Pet.create({
              ...data,
              avatar: `images/${filename}`,
              user,
            }).save();

            resolve({ pet });
          })
          .on('error', (err) => {
            console.error(err);
            reject({ pet: null });
          })
      );
    } catch (error) {
      console.error(error.message);
      return { pet: null };
    }
  }

  @Mutation(() => Pet, { nullable: true })
  async updatePet(
    @Arg('id') id: number,
    @Arg('data') data: UpdatePetInput
  ): Promise<Pet | null> {
    const pet = await Pet.findOne({ where: { id } });
    if (!pet) return null;
    Object.assign(pet, data);
    await pet.save();
    return pet;
  }

  @Mutation(() => Boolean, { nullable: true })
  async deletePet(@Arg('id') id: number): Promise<Boolean | null> {
    const pet = await Pet.findOne({ where: { id } });
    if (!pet) return null;
    await pet.remove();
    return true;
  }
}
