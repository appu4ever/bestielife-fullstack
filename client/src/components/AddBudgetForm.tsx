/*eslint-disable*/
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormErrorMessage,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { toErrorMap } from '../utils/toErrorMap';
import InputField from '../components/InputField';
import { useAddBudgetMutation } from '../generated/graphql';
import { useHistory } from 'react-router-dom';

interface AddBudgetFormProps {
  // budgetAmount: string | undefined;
  // setBudgetAmount: (data: string) => void;
  petId: number;
  finalRef: React.MutableRefObject<undefined>;
  isOpen: boolean;
  onClose: () => void;
}

const AddBudgetForm: React.FC<AddBudgetFormProps> = ({
  petId,
  finalRef,
  isOpen,
  onClose,
}) => {
  const [addBudget] = useAddBudgetMutation();
  const history = useHistory();
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date()
  );
  return (
    //@ts-ignore
    <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <Formik
          initialValues={{ amount: '', monthAndYear: selectedDate }}
          onSubmit={async (values, { setErrors }) => {
            const response = await addBudget({
              variables: {
                options: {
                  amount: parseInt(values.amount),
                  monthAndYear: values.monthAndYear,
                  petId,
                },
              },
            });
            if (response.data?.createBudget.errors) {
              setErrors(toErrorMap(response.data?.createBudget.errors));
            } else {
              history.push('/dashboard');
            }
          }}
        >
          {({ isSubmitting, setFieldValue, errors }) => (
            <Form>
              <Flex>
                <InputField
                  name="amount"
                  placeholder="Budget amount"
                  type="text"
                />
                <Box>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date: Date) => {
                      setSelectedDate(date);
                      setFieldValue('monthAndYear', date);
                    }}
                    customInput={<Input />}
                    dateFormat="MM/yyyy"
                    showMonthYearPicker
                    showFullMonthYearPicker
                  />
                  {errors ? (
                    <FormErrorMessage>{errors.monthAndYear}</FormErrorMessage>
                  ) : null}
                </Box>
              </Flex>
              <Button
                bg={'blue'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                isLoading={isSubmitting}
                type="submit"
                mt={3}
                onClick={onClose}
              >
                Set budget
              </Button>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default AddBudgetForm;
