/*eslint-disable*/
import {
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { FocusableElement } from '@chakra-ui/utils';
import DatePicker from 'react-datepicker';

import InputField from '../components/InputField';
import {
  GetExpensesDocument,
  GetExpensesQuery,
  GetSumOfExpensesDocument,
  useCreateExpenseMutation,
} from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { Calendar } from '../components/Calendar';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { ApolloQueryResult } from '@apollo/client';

interface AddExpenseFormProps {
  petId: number;
  finalRef: FocusableElement | undefined;
  isOpen: boolean;
  onClose: () => void;
  // refetch: (variables?: {
  //   limit: number;
  //   after?: number;
  //   petId: number;
  // }) => Promise<ApolloQueryResult<GetExpensesQuery>>;
  refetch: React.Dispatch<React.SetStateAction<Boolean>>;
}

const AddExpenseForm: React.FC<AddExpenseFormProps> = ({
  petId,
  finalRef,
  isOpen,
  onClose,
  refetch,
}) => {
  const history = useHistory();
  const [addExpense] = useCreateExpenseMutation();
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date()
  );
  return (
    <Modal
      //@ts-ignore
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
      size={'xl'}
    >
      <ModalOverlay />
      <ModalContent p={8}>
        <Formik
          initialValues={{ amount: '', description: '', date: selectedDate }}
          onSubmit={async (values, { setErrors }) => {
            const response = await addExpense({
              variables: {
                options: {
                  amount: parseInt(values.amount),
                  description: values.description,
                  petId,
                  date: values.date,
                },
              },
              update: (
                cache,
                {
                  data: {
                    createExpense: { expense },
                  },
                }
              ) => {
                cache.modify({
                  fields: {
                    getExpenses(existingExpenses = {}) {
                      // console.log(existingExpenses);
                      // console.log(expense);
                      cache.writeQuery({
                        query: GetExpensesDocument,
                        data: {
                          ...existingExpenses,
                          expenses: [...existingExpenses.expenses, expense],
                        },
                      });
                    },
                    getSumOfExpenses(result = {}) {
                      // console.log(result);
                      cache.writeQuery({
                        query: GetSumOfExpensesDocument,
                        data: { ...result, sum: result.sum + expense },
                      });
                    },
                  },
                });
              },
            });

            if (response.data?.createExpense.errors) {
              setErrors(toErrorMap(response.data?.createExpense.errors));
            } else {
              refetch(true);
            }
          }}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form style={{ border: '1px solid black', width: '100%' }}>
              <Stack spacing={8}>
                <Flex>
                  <InputField
                    name="amount"
                    placeholder="Expense amount"
                    type="text"
                    style={{ width: '50px', flex: 1 }}
                  />
                  <InputField
                    name="description"
                    placeholder="Description"
                    type="text"
                    style={{ flex: 2 }}
                  />
                </Flex>
                <Box ml={'auto'}>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date: Date) => {
                      setFieldValue('date', date);
                      setSelectedDate(date);
                    }}
                    calendarContainer={Calendar}
                  />
                </Box>
              </Stack>
              <Button
                bg={'green'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                isLoading={isSubmitting}
                type="submit"
                mt={3}
                onClick={onClose}
              >
                Add expense
              </Button>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default AddExpenseForm;
