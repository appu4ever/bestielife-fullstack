import {
  Arg,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { Budget } from '../entity/Budget';
import { Pet } from '../entity/Pet';
import { formatDate } from '../utils/formatDate';
import { FieldError } from './user';

@InputType()
export class CreateBudgetInput {
  @Field()
  amount: number;

  @Field()
  monthAndYear: Date;

  @Field()
  petId: number;
}

@ObjectType()
class CreateBudgetResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Budget, { nullable: true })
  budget?: Budget;
}

@ObjectType()
class GetBudgetsResponse {
  @Field(() => String, { nullable: true })
  message?: string;

  @Field(() => [GetBudgets], { nullable: true })
  result?: GetBudgets[];
}

@ObjectType()
class GetBudgets {
  @Field(() => String)
  monthAndYear: string;

  @Field(() => Int)
  amount: number;
}

@Resolver()
export class BudgetResolver {
  @Mutation(() => CreateBudgetResponse)
  async createBudget(
    @Arg('options') { amount, monthAndYear, petId }: CreateBudgetInput
  ): Promise<CreateBudgetResponse> {
    console.log(amount, monthAndYear);
    if (!amount) {
      return {
        errors: [{ field: 'amount', message: 'Please enter an amount' }],
      };
    }
    if (!monthAndYear) {
      return {
        errors: [
          { field: 'monthAndYear', message: 'Please enter a month and year' },
        ],
      };
    }
    try {
      const pet = await Pet.findOne({ where: { id: petId } });
      const budget = Budget.create({
        amount,
        monthAndYear,
      });
      budget.pet = pet;
      await budget.save();
      return { budget };
    } catch (error) {
      console.log(error.message);
    }
  }

  @Query(() => GetBudgetsResponse, { nullable: true })
  async getBudgets(
    @Arg('monthAndYear', () => String, { nullable: true })
    monthAndYear: string | null,
    @Arg('petId', () => Int) petId: number
  ): Promise<GetBudgetsResponse | null> {
    if (!monthAndYear) {
      monthAndYear = formatDate(new Date());
    }
    const replacements: any[] = [petId, monthAndYear];

    try {
      const result = await getConnection().query(
        `select budgets.amount, 
        to_char(budgets."monthAndYear",'mm/YYYY') "monthAndYear"
        from budgets where budgets."petId" = $1 
        and to_char(budgets."monthAndYear",'mm/YYYY') = $2;`,
        replacements
      );
      if (result.length === 0) {
        return { result: null };
      } else {
        return { result };
      }
    } catch (error) {
      return { message: error.message };
    }
    // const realLimit = Math.min(50, limit);
    // console.log(cursor);
    // const qb = getConnection()
    //   .getRepository(Budget)
    //   .createQueryBuilder('budgets')
    //   .leftJoinAndSelect('budgets.pet', 'pet')
    //   .where('budgets.petId = :id', { id: petId })
    //   .orderBy('budgets.monthAndYear', 'DESC')
    // .take(realLimit);

    // if (cursor) {
    //   qb.andWhere('budgets.monthAndYear < :cursor', {
    //     cursor,
    //   });
    // }
  }

  @Query(() => Budget, { nullable: true })
  async getBudget(
    @Arg('petId', () => Int) petId: number,
    @Arg('monthAndYear') monthAndYear: string
  ): Promise<Budget | null> {
    return await getConnection()
      .getRepository(Budget)
      .createQueryBuilder('budgets')
      .leftJoinAndSelect('budgets.pet', 'pet')
      .where('budgets.petId = :id', { id: petId })
      .andWhere("TO_CHAR(budgets.createdAt, 'mm/YYYY') = :monthAndYear", {
        monthAndYear,
      })
      .getOne();
  }
}
