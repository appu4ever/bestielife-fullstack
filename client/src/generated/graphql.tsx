import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Budget = {
  __typename?: 'Budget';
  id: Scalars['Float'];
  monthAndYear: Scalars['DateTime'];
  amount: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type CreateBudgetInput = {
  amount: Scalars['Float'];
  monthAndYear: Scalars['DateTime'];
  petId: Scalars['Float'];
};

export type CreateBudgetResponse = {
  __typename?: 'CreateBudgetResponse';
  errors?: Maybe<Array<FieldError>>;
  budget?: Maybe<Budget>;
};

export type CreateExpenseInput = {
  amount: Scalars['Float'];
  description?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['DateTime']>;
  petId: Scalars['Float'];
};

export type CreateExpenseResponse = {
  __typename?: 'CreateExpenseResponse';
  errors?: Maybe<Array<FieldError>>;
  expense?: Maybe<Expense>;
};

export type CreatePetInput = {
  name: Scalars['String'];
  breed: Scalars['String'];
};

export type CreatePetResponse = {
  __typename?: 'CreatePetResponse';
  errors?: Maybe<Array<FieldError>>;
  pet?: Maybe<Pet>;
};

export type CreateUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type Expense = {
  __typename?: 'Expense';
  id: Scalars['Float'];
  amount: Scalars['Float'];
  date?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type ExpenseSum = {
  __typename?: 'ExpenseSum';
  sum: Scalars['Float'];
  monthAndYear: Scalars['String'];
};

export type ExpenseSumResponse = {
  __typename?: 'ExpenseSumResponse';
  message?: Maybe<Scalars['String']>;
  result?: Maybe<Array<ExpenseSum>>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type GetBudgets = {
  __typename?: 'GetBudgets';
  monthAndYear: Scalars['String'];
  amount: Scalars['Int'];
};

export type GetBudgetsResponse = {
  __typename?: 'GetBudgetsResponse';
  message?: Maybe<Scalars['String']>;
  result?: Maybe<Array<GetBudgets>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  forgotPassword: Scalars['Boolean'];
  changePassword: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  createPet: CreatePetResponse;
  updatePet?: Maybe<Pet>;
  deletePet?: Maybe<Scalars['Boolean']>;
  createBudget: CreateBudgetResponse;
  createExpense: CreateExpenseResponse;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: CreateUserInput;
};


export type MutationLoginArgs = {
  options: CreateUserInput;
};


export type MutationCreatePetArgs = {
  picture: Scalars['Upload'];
  data: CreatePetInput;
};


export type MutationUpdatePetArgs = {
  data: UpdatePetInput;
  id: Scalars['Float'];
};


export type MutationDeletePetArgs = {
  id: Scalars['Float'];
};


export type MutationCreateBudgetArgs = {
  options: CreateBudgetInput;
};


export type MutationCreateExpenseArgs = {
  options: CreateExpenseInput;
};

export type PaginatedExpenses = {
  __typename?: 'PaginatedExpenses';
  expenses: Array<Expense>;
  hasMore: Scalars['Boolean'];
  cursor: Scalars['Float'];
};

export type Pet = {
  __typename?: 'Pet';
  id: Scalars['Float'];
  name: Scalars['String'];
  breed: Scalars['String'];
  avatar: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  me?: Maybe<User>;
  pets: Array<Pet>;
  pet?: Maybe<Pet>;
  getBudgets?: Maybe<GetBudgetsResponse>;
  getBudget?: Maybe<Budget>;
  getExpenses?: Maybe<PaginatedExpenses>;
  getSumOfExpenses?: Maybe<ExpenseSumResponse>;
  getExpenseSumAndBudgetForMonth?: Maybe<Scalars['String']>;
};


export type QueryPetsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryPetArgs = {
  id: Scalars['Int'];
};


export type QueryGetBudgetsArgs = {
  petId: Scalars['Int'];
  monthAndYear?: Maybe<Scalars['String']>;
};


export type QueryGetBudgetArgs = {
  monthAndYear: Scalars['String'];
  petId: Scalars['Int'];
};


export type QueryGetExpensesArgs = {
  petId: Scalars['Int'];
  after?: Maybe<Scalars['Int']>;
  limit: Scalars['Int'];
};


export type QueryGetSumOfExpensesArgs = {
  petId: Scalars['Int'];
};


export type QueryGetExpenseSumAndBudgetForMonthArgs = {
  petId: Scalars['Float'];
  monthAndYear?: Maybe<Scalars['String']>;
};

export type UpdatePetInput = {
  name?: Maybe<Scalars['String']>;
  breed?: Maybe<Scalars['String']>;
};


export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  email: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type AuthUserFragmentFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & Pick<FieldError, 'field' | 'message'>
  )>>, user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email'>
  )> }
);

export type AddBudgetMutationVariables = Exact<{
  options: CreateBudgetInput;
}>;


export type AddBudgetMutation = (
  { __typename?: 'Mutation' }
  & { createBudget: (
    { __typename?: 'CreateBudgetResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, budget?: Maybe<(
      { __typename?: 'Budget' }
      & Pick<Budget, 'amount'>
    )> }
  ) }
);

export type CreateExpenseMutationVariables = Exact<{
  options: CreateExpenseInput;
}>;


export type CreateExpenseMutation = (
  { __typename?: 'Mutation' }
  & { createExpense: (
    { __typename?: 'CreateExpenseResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, expense?: Maybe<(
      { __typename?: 'Expense' }
      & Pick<Expense, 'amount' | 'date' | 'description' | 'createdAt' | 'updatedAt'>
    )> }
  ) }
);

export type CreatePetMutationVariables = Exact<{
  data: CreatePetInput;
  picture: Scalars['Upload'];
}>;


export type CreatePetMutation = (
  { __typename?: 'Mutation' }
  & { createPet: (
    { __typename?: 'CreatePetResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, pet?: Maybe<(
      { __typename?: 'Pet' }
      & Pick<Pet, 'id' | 'name' | 'breed' | 'avatar'>
    )> }
  ) }
);

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & AuthUserFragmentFragment
  ) }
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & AuthUserFragmentFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & AuthUserFragmentFragment
  ) }
);

export type GetBudgetQueryVariables = Exact<{
  petId: Scalars['Int'];
  monthAndYear: Scalars['String'];
}>;


export type GetBudgetQuery = (
  { __typename?: 'Query' }
  & { getBudget?: Maybe<(
    { __typename?: 'Budget' }
    & Pick<Budget, 'id' | 'amount'>
  )> }
);

export type GetBudgetsQueryVariables = Exact<{
  monthAndYear?: Maybe<Scalars['String']>;
  petId: Scalars['Int'];
}>;


export type GetBudgetsQuery = (
  { __typename?: 'Query' }
  & { getBudgets?: Maybe<(
    { __typename?: 'GetBudgetsResponse' }
    & Pick<GetBudgetsResponse, 'message'>
    & { result?: Maybe<Array<(
      { __typename?: 'GetBudgets' }
      & Pick<GetBudgets, 'monthAndYear' | 'amount'>
    )>> }
  )> }
);

export type GetSumOfExpensesQueryVariables = Exact<{
  petId: Scalars['Int'];
}>;


export type GetSumOfExpensesQuery = (
  { __typename?: 'Query' }
  & { getSumOfExpenses?: Maybe<(
    { __typename?: 'ExpenseSumResponse' }
    & Pick<ExpenseSumResponse, 'message'>
    & { result?: Maybe<Array<(
      { __typename?: 'ExpenseSum' }
      & Pick<ExpenseSum, 'sum' | 'monthAndYear'>
    )>> }
  )> }
);

export type GetExpensesQueryVariables = Exact<{
  limit: Scalars['Int'];
  after?: Maybe<Scalars['Int']>;
  petId: Scalars['Int'];
}>;


export type GetExpensesQuery = (
  { __typename?: 'Query' }
  & { getExpenses?: Maybe<(
    { __typename?: 'PaginatedExpenses' }
    & Pick<PaginatedExpenses, 'hasMore' | 'cursor'>
    & { expenses: Array<(
      { __typename?: 'Expense' }
      & Pick<Expense, 'id' | 'amount' | 'description' | 'date'>
    )> }
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email'>
  )> }
);

export type PetsQueryVariables = Exact<{
  limit: Scalars['Int'];
}>;


export type PetsQuery = (
  { __typename?: 'Query' }
  & { pets: Array<(
    { __typename?: 'Pet' }
    & Pick<Pet, 'id' | 'name' | 'breed' | 'avatar'>
  )> }
);

export const AuthUserFragmentFragmentDoc = gql`
    fragment AuthUserFragment on UserResponse {
  errors {
    field
    message
  }
  user {
    id
    email
  }
}
    `;
export const AddBudgetDocument = gql`
    mutation AddBudget($options: CreateBudgetInput!) {
  createBudget(options: $options) {
    errors {
      field
      message
    }
    budget {
      amount
    }
  }
}
    `;
export type AddBudgetMutationFn = Apollo.MutationFunction<AddBudgetMutation, AddBudgetMutationVariables>;

/**
 * __useAddBudgetMutation__
 *
 * To run a mutation, you first call `useAddBudgetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddBudgetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addBudgetMutation, { data, loading, error }] = useAddBudgetMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useAddBudgetMutation(baseOptions?: Apollo.MutationHookOptions<AddBudgetMutation, AddBudgetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddBudgetMutation, AddBudgetMutationVariables>(AddBudgetDocument, options);
      }
export type AddBudgetMutationHookResult = ReturnType<typeof useAddBudgetMutation>;
export type AddBudgetMutationResult = Apollo.MutationResult<AddBudgetMutation>;
export type AddBudgetMutationOptions = Apollo.BaseMutationOptions<AddBudgetMutation, AddBudgetMutationVariables>;
export const CreateExpenseDocument = gql`
    mutation CreateExpense($options: CreateExpenseInput!) {
  createExpense(options: $options) {
    errors {
      field
      message
    }
    expense {
      amount
      date
      description
      createdAt
      updatedAt
    }
  }
}
    `;
export type CreateExpenseMutationFn = Apollo.MutationFunction<CreateExpenseMutation, CreateExpenseMutationVariables>;

/**
 * __useCreateExpenseMutation__
 *
 * To run a mutation, you first call `useCreateExpenseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateExpenseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createExpenseMutation, { data, loading, error }] = useCreateExpenseMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useCreateExpenseMutation(baseOptions?: Apollo.MutationHookOptions<CreateExpenseMutation, CreateExpenseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateExpenseMutation, CreateExpenseMutationVariables>(CreateExpenseDocument, options);
      }
export type CreateExpenseMutationHookResult = ReturnType<typeof useCreateExpenseMutation>;
export type CreateExpenseMutationResult = Apollo.MutationResult<CreateExpenseMutation>;
export type CreateExpenseMutationOptions = Apollo.BaseMutationOptions<CreateExpenseMutation, CreateExpenseMutationVariables>;
export const CreatePetDocument = gql`
    mutation CreatePet($data: CreatePetInput!, $picture: Upload!) {
  createPet(data: $data, picture: $picture) {
    errors {
      field
      message
    }
    pet {
      id
      name
      breed
      avatar
    }
  }
}
    `;
export type CreatePetMutationFn = Apollo.MutationFunction<CreatePetMutation, CreatePetMutationVariables>;

/**
 * __useCreatePetMutation__
 *
 * To run a mutation, you first call `useCreatePetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPetMutation, { data, loading, error }] = useCreatePetMutation({
 *   variables: {
 *      data: // value for 'data'
 *      picture: // value for 'picture'
 *   },
 * });
 */
export function useCreatePetMutation(baseOptions?: Apollo.MutationHookOptions<CreatePetMutation, CreatePetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePetMutation, CreatePetMutationVariables>(CreatePetDocument, options);
      }
export type CreatePetMutationHookResult = ReturnType<typeof useCreatePetMutation>;
export type CreatePetMutationResult = Apollo.MutationResult<CreatePetMutation>;
export type CreatePetMutationOptions = Apollo.BaseMutationOptions<CreatePetMutation, CreatePetMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...AuthUserFragment
  }
}
    ${AuthUserFragmentFragmentDoc}`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(options: {email: $email, password: $password}) {
    ...AuthUserFragment
  }
}
    ${AuthUserFragmentFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!) {
  register(options: {email: $email, password: $password}) {
    ...AuthUserFragment
  }
}
    ${AuthUserFragmentFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const GetBudgetDocument = gql`
    query GetBudget($petId: Int!, $monthAndYear: String!) {
  getBudget(petId: $petId, monthAndYear: $monthAndYear) {
    id
    amount
  }
}
    `;

/**
 * __useGetBudgetQuery__
 *
 * To run a query within a React component, call `useGetBudgetQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBudgetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBudgetQuery({
 *   variables: {
 *      petId: // value for 'petId'
 *      monthAndYear: // value for 'monthAndYear'
 *   },
 * });
 */
export function useGetBudgetQuery(baseOptions: Apollo.QueryHookOptions<GetBudgetQuery, GetBudgetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBudgetQuery, GetBudgetQueryVariables>(GetBudgetDocument, options);
      }
export function useGetBudgetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBudgetQuery, GetBudgetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBudgetQuery, GetBudgetQueryVariables>(GetBudgetDocument, options);
        }
export type GetBudgetQueryHookResult = ReturnType<typeof useGetBudgetQuery>;
export type GetBudgetLazyQueryHookResult = ReturnType<typeof useGetBudgetLazyQuery>;
export type GetBudgetQueryResult = Apollo.QueryResult<GetBudgetQuery, GetBudgetQueryVariables>;
export const GetBudgetsDocument = gql`
    query GetBudgets($monthAndYear: String, $petId: Int!) {
  getBudgets(monthAndYear: $monthAndYear, petId: $petId) {
    result {
      monthAndYear
      amount
    }
    message
  }
}
    `;

/**
 * __useGetBudgetsQuery__
 *
 * To run a query within a React component, call `useGetBudgetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBudgetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBudgetsQuery({
 *   variables: {
 *      monthAndYear: // value for 'monthAndYear'
 *      petId: // value for 'petId'
 *   },
 * });
 */
export function useGetBudgetsQuery(baseOptions: Apollo.QueryHookOptions<GetBudgetsQuery, GetBudgetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBudgetsQuery, GetBudgetsQueryVariables>(GetBudgetsDocument, options);
      }
export function useGetBudgetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBudgetsQuery, GetBudgetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBudgetsQuery, GetBudgetsQueryVariables>(GetBudgetsDocument, options);
        }
export type GetBudgetsQueryHookResult = ReturnType<typeof useGetBudgetsQuery>;
export type GetBudgetsLazyQueryHookResult = ReturnType<typeof useGetBudgetsLazyQuery>;
export type GetBudgetsQueryResult = Apollo.QueryResult<GetBudgetsQuery, GetBudgetsQueryVariables>;
export const GetSumOfExpensesDocument = gql`
    query GetSumOfExpenses($petId: Int!) {
  getSumOfExpenses(petId: $petId) {
    result {
      sum
      monthAndYear
    }
    message
  }
}
    `;

/**
 * __useGetSumOfExpensesQuery__
 *
 * To run a query within a React component, call `useGetSumOfExpensesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSumOfExpensesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSumOfExpensesQuery({
 *   variables: {
 *      petId: // value for 'petId'
 *   },
 * });
 */
export function useGetSumOfExpensesQuery(baseOptions: Apollo.QueryHookOptions<GetSumOfExpensesQuery, GetSumOfExpensesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSumOfExpensesQuery, GetSumOfExpensesQueryVariables>(GetSumOfExpensesDocument, options);
      }
export function useGetSumOfExpensesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSumOfExpensesQuery, GetSumOfExpensesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSumOfExpensesQuery, GetSumOfExpensesQueryVariables>(GetSumOfExpensesDocument, options);
        }
export type GetSumOfExpensesQueryHookResult = ReturnType<typeof useGetSumOfExpensesQuery>;
export type GetSumOfExpensesLazyQueryHookResult = ReturnType<typeof useGetSumOfExpensesLazyQuery>;
export type GetSumOfExpensesQueryResult = Apollo.QueryResult<GetSumOfExpensesQuery, GetSumOfExpensesQueryVariables>;
export const GetExpensesDocument = gql`
    query GetExpenses($limit: Int!, $after: Int, $petId: Int!) {
  getExpenses(limit: $limit, petId: $petId, after: $after) {
    hasMore
    cursor
    expenses {
      id
      amount
      description
      date
    }
  }
}
    `;

/**
 * __useGetExpensesQuery__
 *
 * To run a query within a React component, call `useGetExpensesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExpensesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExpensesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      after: // value for 'after'
 *      petId: // value for 'petId'
 *   },
 * });
 */
export function useGetExpensesQuery(baseOptions: Apollo.QueryHookOptions<GetExpensesQuery, GetExpensesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetExpensesQuery, GetExpensesQueryVariables>(GetExpensesDocument, options);
      }
export function useGetExpensesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExpensesQuery, GetExpensesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetExpensesQuery, GetExpensesQueryVariables>(GetExpensesDocument, options);
        }
export type GetExpensesQueryHookResult = ReturnType<typeof useGetExpensesQuery>;
export type GetExpensesLazyQueryHookResult = ReturnType<typeof useGetExpensesLazyQuery>;
export type GetExpensesQueryResult = Apollo.QueryResult<GetExpensesQuery, GetExpensesQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    email
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const PetsDocument = gql`
    query Pets($limit: Int!) {
  pets(limit: $limit) {
    id
    name
    breed
    avatar
  }
}
    `;

/**
 * __usePetsQuery__
 *
 * To run a query within a React component, call `usePetsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePetsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function usePetsQuery(baseOptions: Apollo.QueryHookOptions<PetsQuery, PetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PetsQuery, PetsQueryVariables>(PetsDocument, options);
      }
export function usePetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PetsQuery, PetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PetsQuery, PetsQueryVariables>(PetsDocument, options);
        }
export type PetsQueryHookResult = ReturnType<typeof usePetsQuery>;
export type PetsLazyQueryHookResult = ReturnType<typeof usePetsLazyQuery>;
export type PetsQueryResult = Apollo.QueryResult<PetsQuery, PetsQueryVariables>;