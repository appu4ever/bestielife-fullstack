/*eslint-disable*/
import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Spinner,
  Stack,
  useDisclosure,
  Text,
  Link,
  useTheme,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  VStack,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';
import ExpenseBarChart from '../components/ExpenseBarChart';

import {
  useGetSumOfExpensesQuery,
  useGetBudgetsQuery,
} from '../generated/graphql';
import AddBudgetForm from '../components/AddBudgetForm';
import { formatDate } from '../utils/formatDate';
import { usePetID } from '../contexts/pet-context';

const ExpenseDashboard: React.FC<{}> = () => {
  let date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth();
  let startDate = new Date(y, m, 1);

  let budgetAmount: number = 0,
    expenseAmount: number = 0,
    remainingAmount: number = 0;
  let totalBudgets: Record<string, number> = {},
    totalExpenses: Record<string, number> = {};

  let body = null;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef();
  const theme = useTheme();
  //@ts-ignore
  const [petId, setpetId] = usePetID();
  const {
    data: expenseData,
    loading: expenseDataFetching,
    refetch: expenseSumRefetch,
    error: expenseError,
  } = useGetSumOfExpensesQuery({
    variables: {
      petId,
    },
  });

  const {
    data: budgetData,
    loading: budgetDataFetching,
    refetch: budgetRefetch,
    error: budgetError,
  } = useGetBudgetsQuery({
    variables: { petId: petId },
  });

  console.log(budgetError, expenseError);

  if (
    (!budgetData && budgetDataFetching) ||
    (!expenseData && expenseDataFetching)
  ) {
    body = <Spinner size="lg" />;
  } else {
    if (budgetData?.getBudgets && budgetData.getBudgets?.result) {
      totalBudgets = budgetData.getBudgets?.result.reduce<
        Record<string, number>
      >((acc, curr) => {
        acc[curr.monthAndYear] = curr.amount;
        return acc;
      }, {} as Record<keyof string, number>);
      budgetAmount = totalBudgets[formatDate(new Date())];
    }
    if (expenseData?.getSumOfExpenses?.result) {
      totalExpenses = expenseData?.getSumOfExpenses?.result.reduce<
        Record<string, number>
      >((acc, curr) => {
        acc[curr.monthAndYear] = curr.sum;
        return acc;
      }, {} as Record<keyof string, number>);

      expenseAmount = totalExpenses[formatDate(new Date())];
    }

    remainingAmount = budgetAmount - expenseAmount;

    body = (
      <Stack spacing={8} width={{ md: '4xl' }}>
        <Flex p={5} shadow="md" borderWidth="1px">
          <Stack spacing={4} borderRight="1px" borderColor="gray.200">
            <Flex justify="center" paddingRight={3} paddingTop={10}>
              {budgetData?.getBudgets ? (
                <Text fontSize="xl" fontWeight="bold">
                  Budget
                </Text>
              ) : (
                <Flex direction="column">
                  <Link color={theme.colors.blue} onClick={onOpen}>
                    Add budget
                  </Link>
                  <AddBudgetForm
                    isOpen={isOpen}
                    finalRef={finalRef}
                    onClose={onClose}
                    petId={petId}
                  />
                </Flex>
              )}

              {budgetData?.getBudgets && (
                <CircularProgress
                  value={(expenseAmount / budgetAmount) * 100}
                  color={'blue'}
                  size="150px"
                >
                  <Box>
                    <CircularProgressLabel>
                      {(expenseAmount / budgetAmount) * 100 > 100
                        ? 100
                        : (expenseAmount / budgetAmount) * 100}
                      %<Text fontSize="sm">spent</Text>
                    </CircularProgressLabel>
                  </Box>
                </CircularProgress>
              )}
            </Flex>
            <Flex justify="space-between" w={'100%'}>
              {' '}
              <Stat>
                <StatLabel color="red.500" fontWeight="bold">
                  Expenses
                </StatLabel>
                <StatNumber fontSize="md">
                  {expenseData?.getSumOfExpenses?.result
                    ? `$${expenseAmount}`
                    : 'No expenses'}
                </StatNumber>
                <StatHelpText>{formatDate(startDate)}</StatHelpText>
              </Stat>
              <Stat>
                <StatLabel color="gray.500" fontWeight="bold">
                  Remaining
                </StatLabel>
                <StatNumber fontSize="md">${remainingAmount}</StatNumber>
                <StatHelpText>{formatDate(startDate)}</StatHelpText>
              </Stat>
            </Flex>
          </Stack>
          <VStack w={'100%'} spacing={4}>
            <ExpenseBarChart
              totalBudgets={totalBudgets}
              totalExpenses={totalExpenses}
            />
            <Box alignSelf="flex-end">
              <RouterLink
                to={{ pathname: `/all-expenses/${petId}`, state: { petId } }}
              >
                <Link color={theme.colors.blue}>View all expenses</Link>
              </RouterLink>
            </Box>
          </VStack>
        </Flex>
      </Stack>
    );
  }
  return <>{body}</>;
};

export default ExpenseDashboard;
