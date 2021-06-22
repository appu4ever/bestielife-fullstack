/*eslint-disable*/
import { Spinner, Stack, Text, Button } from '@chakra-ui/react';
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';

import { usePetID } from '../contexts/pet-context';
import {
  Expense,
  GetExpensesQuery,
  PaginatedExpenses,
  useGetExpensesLazyQuery,
  useGetExpensesQuery,
} from '../generated/graphql';
import AppPageLayout from '../layouts/AppPageLayout';
import { months } from '../constants';

import { ExpenseCard } from '../components/ExpenseCard';
import { formatDate } from '../utils/formatDate';
import AllExpensesHeader from '../components/all-expenses/AllExpensesHeader';

const AllExpenses: React.FC<{}> = ({}) => {
  const [isLoading, setIsLoading] = React.useState<Boolean>(false);
  const [monthAndYear, setMonthAndYear] = React.useState<string>(
    `${months[new Date().getMonth()]} ${new Date().getFullYear()}`
  );
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date()
  );
  const [expenses, setExpenses] =
    React.useState<PaginatedExpenses | null>(null);
  //@ts-ignore
  const [petId] = usePetID();

  const { data, loading, error, fetchMore, variables, refetch } =
    useGetExpensesQuery({
      variables: {
        limit: 10,
        petId: petId,
      },
    });

  const [
    expenseQuery,
    { data: searchExpenseData, loading: searchExpenseLoading },
  ] = useGetExpensesLazyQuery({
    fetchPolicy: 'no-cache',
  });

  React.useEffect(() => {
    // @ts-ignore
    if (data?.getExpenses) setExpenses(data?.getExpenses);
  }, [data?.getExpenses]);

  React.useEffect(() => {
    if (searchExpenseData?.getExpenses) {
      // @ts-ignore
      setExpenses(searchExpenseData?.getExpenses);
    } else {
      setExpenses(null);
    }
  }, [searchExpenseData?.getExpenses]);

  // console.log('searchExpenseData.getExpenses.expenses', searchExpenseData);
  // console.log('data.getExpenses.expenses', data?.getExpenses);
  console.log('expenses', expenses);

  if (searchExpenseLoading || loading) {
    return <Spinner size="lg" />;
  }

  return (
    <AppPageLayout>
      <Stack w={{ md: '4xl' }} spacing={8}>
        <Stack spacing={8} w={'80%'} margin={'0 auto'}>
          <AllExpensesHeader
            monthAndYear={monthAndYear}
            refetch={refetch}
            petId={petId}
            date={selectedDate}
            onChange={(date: Date) => {
              setSelectedDate(date);
              setMonthAndYear(formatDate(date, 'with-date'));
              expenseQuery({
                variables: {
                  limit: 10,
                  petId,
                  date: formatDate(date, 'with-date'),
                },
              });
            }}
            onClear={() => {
              data.getExpenses
                ? //@ts-ignore
                  setExpenses(data.getExpenses)
                : setExpenses(null);
            }}
          />

          {expenses ? (
            <>
              {expenses.expenses.map((expense) => (
                <div key={expense.id}>
                  <ExpenseCard expense={expense} />
                </div>
              ))}
              {expenses && expenses.hasMore ? (
                isLoading ? (
                  <Spinner size="sm" />
                ) : (
                  <Button
                    mt={12}
                    isLoading={loading}
                    onClick={async () => {
                      setIsLoading(true);
                      await fetchMore({
                        variables: {
                          limit: variables?.limit,
                          petId,
                          after: data.getExpenses.cursor,
                        },
                      });
                      setIsLoading(false);
                    }}
                  >
                    Load more
                  </Button>
                )
              ) : null}
            </>
          ) : (
            <Text>You do not have expenses for {monthAndYear}</Text>
          )}
        </Stack>
      </Stack>
    </AppPageLayout>
  );
};

export default AllExpenses;
