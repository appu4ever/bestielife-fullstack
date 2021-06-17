import { IconButton, Flex, Heading, Stack, Text, Link } from '@chakra-ui/react';
import React from 'react';
import { Expense } from '../generated/graphql';
import { formatDate } from '../utils/formatDate';
import theme from '../theme';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

interface ExpenseCardProps {
  expense: Pick<Expense, 'id' | 'amount' | 'description' | 'date'>;
}

export const ExpenseCard: React.FC<ExpenseCardProps> = ({ expense }) => {
  return (
    <Flex
      py={4}
      px={8}
      shadow="md"
      borderWidth="1px"
      borderRadius="md"
      justifyContent="space-between"
    >
      <Stack spacing={4} flex={2}>
        <Heading fontSize="xl">{expense.description}</Heading>
        <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
          {formatDate(new Date(expense.date), 'with-date')}
        </Text>
      </Stack>
      <Flex flex={1}>
        <Heading fontSize="xl" mt={4}>
          ${expense.amount}
        </Heading>
      </Flex>
      <Flex flex={1} align="center" justifyContent="flex-end">
        <IconButton
          background="transparent"
          color={theme.colors.green}
          as={Link}
          mr={4}
          aria-label="Edit"
          //   onClick={onOpen}
          icon={<EditIcon />}
        />
        <IconButton
          background="transparent"
          color={'red.500'}
          as={Link}
          mr={4}
          aria-label="Delete"
          //   onClick={onOpen}
          icon={<DeleteIcon />}
        />
      </Flex>
    </Flex>
  );
};
