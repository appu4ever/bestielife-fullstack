import { Field, Int, ObjectType } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Pet } from './Pet';

@ObjectType()
@Entity('expenses')
export class Expense extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: 'int' })
  amount: number;

  @Field(() => Date, { nullable: true })
  @Column({ type: 'date' })
  date?: Date;

  @Field(() => String, { nullable: true })
  @Column()
  description?: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Pet, (pet) => pet.expenses)
  pet: Pet;
}
