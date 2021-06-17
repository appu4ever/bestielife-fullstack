/*eslint-disable*/
import {
  Box,
  Flex,
  Link,
  Spinner,
  Stack,
  useDisclosure,
  useTheme,
  Text,
  Heading,
  Button,
  IconButton,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import React from 'react';
import { FocusableElement } from '@chakra-ui/utils';
import { AddIcon, SearchIcon } from '@chakra-ui/icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { usePetID } from '../contexts/pet-context';
import { useGetExpensesQuery } from '../generated/graphql';
import AppPageLayout from '../layouts/AppPageLayout';
import AddExpenseForm from '../components/AddExpenseForm';
import { months } from '../constants';

import { ExpenseCard } from '../components/ExpenseCard';
import { Calendar } from '../components/Calendar';

interface Variables {
  limit: number;
  cursor?: number | null;
  petId: number;
}

const AllExpenses: React.FC<{}> = ({}) => {
  const history = useHistory();
  const theme = useTheme();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef<FocusableElement | undefined>(undefined);
  const [isLoading, setIsLoading] = React.useState<Boolean>(false);
  const [monthAndYear, setMonthAndYear] = React.useState<string>(
    `${months[new Date().getMonth()]} ${new Date().getFullYear()}`
  );
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date()
  );
  //@ts-ignore
  const [petId, setPetId] = usePetID();

  // console.log('PETID', petId);

  const {
    data,
    loading: expenseLoading,
    error,
    fetchMore,
    variables,
    refetch,
  } = useGetExpensesQuery({
    variables: {
      limit: 10,
      petId: petId,
    },
    // notifyOnNetworkStatusChange: true,
    // fetchPolicy: 'cache-and-network',
    // nextFetchPolicy: 'cache-first',
  });

  const refetchQuery = React.useCallback(async () => {
    await refetch();
  }, [petId]);
  React.useEffect(() => {
    // console.log('running useeffect', petId);
    // if (isLoading) {
    refetchQuery();
    // }
  }, [petId]);

  // console.log('DATA:', data?.getExpenses?.expenses);

  let body = null;

  // console.log('ERROR', error);
  if (expenseLoading) {
    body = <Spinner size="lg" />;
  } else {
    if (data?.getExpenses) {
      body = (
        <>
          <Stack spacing={8} w={'80%'} margin={'0 auto'}>
            <Flex w={'100%'} justifyContent="space-between">
              <Text fontSize={'lg'} fontWeight="bold">
                {monthAndYear}
              </Text>
              <Flex justifyContent="space-between">
                <Box>
                  <IconButton
                    color={theme.colors.blue}
                    as={Link}
                    mr={4}
                    aria-label="Add"
                    onClick={onOpen}
                    icon={<AddIcon />}
                  />

                  <AddExpenseForm
                    isOpen={isOpen}
                    //@ts-ignore
                    finalRef={finalRef}
                    onClose={onClose}
                    petId={petId}
                    refetch={refetch}
                  />
                </Box>
                <Box>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date: Date) => {
                      setSelectedDate(date);
                      // setFieldValue('monthAndYear', date);
                    }}
                    customInput={
                      <IconButton
                        color={theme.colors.blue}
                        as={Link}
                        mr={4}
                        aria-label="Search"
                        onClick={onOpen}
                        icon={<SearchIcon />}
                      />
                    }
                    calendarContainer={Calendar}
                  />
                </Box>
              </Flex>
            </Flex>

            {data.getExpenses.expenses.map((expense) => (
              <div key={expense.id}>
                <ExpenseCard expense={expense} />
              </div>
            ))}
          </Stack>
        </>
      );
    } else {
      body = <Text>You do not have expenses for this month.</Text>;
    }
  }
  return (
    <AppPageLayout>
      <Stack w={{ md: '4xl' }} spacing={8}>
        {body}
      </Stack>
      {data?.getExpenses && data.getExpenses.hasMore ? (
        isLoading ? (
          <Spinner size="sm" />
        ) : (
          <Button
            mt={12}
            isLoading={expenseLoading}
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
    </AppPageLayout>
  );
};

export default AllExpenses;
