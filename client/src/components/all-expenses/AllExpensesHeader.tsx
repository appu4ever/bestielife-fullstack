import { AddIcon, CloseIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Flex,
  Text,
  Box,
  IconButton,
  Link,
  useTheme,
  useDisclosure,
} from '@chakra-ui/react';
import { FocusableElement } from '@chakra-ui/utils';
import React from 'react';
import AddExpenseForm from '../AddExpenseForm';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar } from '../Calendar';
import { ApolloQueryResult } from '@apollo/client';
import { GetExpensesQuery } from '../../generated/graphql';

interface AllExpensesHeaderProps {
  monthAndYear: string;
  petId: number;
  refetch: () => Promise<ApolloQueryResult<GetExpensesQuery>>;
  onChange: (date: Date) => void;
  date: Date;
  onClear: () => void;
}

const AllExpensesHeader: React.FC<AllExpensesHeaderProps> = ({
  monthAndYear,
  petId,
  refetch,
  onChange,
  date,
  onClear,
}) => {
  const theme = useTheme();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef<FocusableElement | undefined>(undefined);

  return (
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
            refetch={() => refetch()}
          />
        </Box>
        <Box>
          {' '}
          <DatePicker
            selected={date}
            onChange={onChange}
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
        <IconButton
          color={theme.colors.blue}
          as={Link}
          mr={4}
          aria-label="Clear filter"
          onClick={onClear}
          icon={<CloseIcon />}
        />
      </Flex>
    </Flex>
  );
};
export default AllExpensesHeader;
