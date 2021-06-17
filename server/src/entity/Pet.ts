import { Field, Int, ObjectType } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Budget } from './Budget';
import { Expense } from './Expense';
import { User } from './User';

@ObjectType()
@Entity('pets')
export class Pet extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ nullable: true })
  breed: string;

  @Field()
  @Column()
  avatar: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.pets)
  user: User;

  @OneToMany(() => Budget, (budget) => budget.pet)
  budgets: Budget[];

  @OneToMany(() => Expense, (expense) => expense.pet)
  expenses: Expense[];
}
