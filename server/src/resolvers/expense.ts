import {
  Arg,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import { getConnection, getManager } from 'typeorm';
import { stringify } from 'uuid';
import { Budget } from '../entity/Budget';
import { Expense } from '../entity/Expense';
import { Pet } from '../entity/Pet';
import { FieldError } from './user';

@InputType()
export class CreateExpenseInput {
  @Field()
  amount: number;

  @Field({ nullable: true })
  description?: string = '';

  @Field({ nullable: true })
  date?: Date;

  @Field()
  petId: number;
}

@ObjectType()
class ExpenseSum {
  @Field(() => Number)
  sum: number;

  @Field(() => String)
  monthAndYear: string;
}

@ObjectType()
class PaginatedExpenses {
  @Field(() => [Expense])
  expenses: Expense[];

  @Field(() => Boolean)
  hasMore: boolean;

  @Field(() => Number)
  cursor: number;
}

@ObjectType()
class CreateExpenseResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Expense, { nullable: true })
  expense?: Expense;
}

@ObjectType()
export class ExpenseSumResponse {
  @Field(() => String, { nullable: true })
  message?: string;

  @Field(() => [ExpenseSum], { nullable: true })
  result?: ExpenseSum[];
}

@Resolver()
export class ExpenseResolver {
  // @FieldResolver(() => String)
  // descSnippet(@Root() expense: Expense) {
  //   return expense.description.slice(0, 50);
  // }
  @Mutation(() => CreateExpenseResponse)
  async createExpense(
    @Arg('options') { amount, description, petId, date }: CreateExpenseInput
  ): Promise<CreateExpenseResponse> {
    console.log(amount, description, date, petId);
    // console.log(new Date().toISOString());
    // console.log(new Date());
    if (!amount) {
      return {
        errors: [{ field: 'amount', message: 'Please enter an amount' }],
      };
    }
    try {
      const pet = await Pet.findOne({ where: { id: petId } });
      const expense = Expense.create({
        amount,
        description,
        date,
      });
      expense.pet = pet;
      await expense.save();
      return { expense };
    } catch (error) {
      console.log(error.message);
    }
  }

  @Query(() => PaginatedExpenses, { nullable: true })
  async getExpenses(
    @Arg('limit', () => Int) limit: number,
    @Arg('after', () => Int, { nullable: true }) after: number | null,
    @Arg('petId', () => Int) petId: number
  ): Promise<PaginatedExpenses | null> {
    const realLimit = Math.min(50, limit);
    const realLimitPlusOne = realLimit + 1;

    console.log('PETID', petId);
    const replacements: any[] = [petId, realLimitPlusOne];
    if (after) {
      replacements.push(after);
    }
    // const result = await getConnection().query(
    //   `select expenses.id, expenses.amount, expenses.description,
    //   expenses.date
    //   from expenses where expenses."petId" = $1
    //   ${cursor ? `and TO_CHAR(expenses.date, 'mm/dd/YYYY') < $3` : ''}
    //   order by expenses.date DESC limit $2`,
    //   replacements
    // );
    const result = await getConnection().query(
      `select expenses.id, expenses.amount, expenses.description,
      expenses.date
      from expenses where expenses."petId" = $1
      ${after ? `and expenses.id < $3` : ''}
      order by expenses.id DESC limit $2`,
      replacements
    );
    console.log('PETID', petId);
    if (result.length === 0) {
      return null;
    } else {
      return {
        expenses: result.slice(0, realLimit),
        hasMore: result.length === realLimitPlusOne,
        cursor: result[result.length - 1].id,
      };
    }
  }

  @Query(() => ExpenseSumResponse, { nullable: true })
  async getSumOfExpenses(
    @Arg('petId', () => Int) petId: number
  ): Promise<ExpenseSumResponse | null> {
    const replacements: any[] = [petId];

    try {
      const result = await getConnection().query(
        `select SUM(expenses.amount), 
        to_char(expenses.date, 'mm/YYYY') "monthAndYear" 
        from expenses where expenses."petId" = $1 group 
        by to_char(expenses.date, 'mm/YYYY');`,
        replacements
      );

      if (result.length === 0) {
        return { result: null };
      } else {
        return {
          result,
        };
      }
    } catch (error) {
      return { message: error.message };
    }
  }

  @Query(() => String, { nullable: true })
  async getExpenseSumAndBudgetForMonth(
    @Arg('monthAndYear', { nullable: true }) monthAndYear: string,
    @Arg('petId') petId: number
  ): Promise<String | null> {
    const qb = getManager()
      .createQueryBuilder(Expense, 'expenses')
      .select('SUM(expenses.amount)', 'expenseSum')
      .addSelect('budget.amount', 'budgetAmount')
      .where('expenses.petId = :id', { id: petId })
      .innerJoin(Budget, 'budget', 'budget.petId = expenses.petId')
      .andWhere("TO_CHAR(expenses.createdAt, 'mm/yyyy') = :monthAndYear", {
        monthAndYear,
      })
      .andWhere("TO_CHAR(budget.monthAndYear, 'mm/yyyy') = :monthAndYear", {
        monthAndYear,
      });

    return JSON.stringify(await qb.getRawMany());
  }
}
