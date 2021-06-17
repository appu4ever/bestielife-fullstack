/*eslint-disable*/
import React from 'react';
import { Box, Heading, Spinner, Stack } from '@chakra-ui/react';

import AppPageLayout from '../layouts/AppPageLayout';

import ExpenseDashboard from '../sections/ExpenseDashboard';
import { usePetID } from '../contexts/pet-context';
import { usePetsQuery } from '../generated/graphql';
import { Error } from '../components/Error';

const Dashboard: React.FC<{}> = ({}) => {
  //@ts-ignore
  const [petId, setPetId, data] = usePetID();
  let body = null;
  if (data.pets.length === 0) {
    body = <Heading variant="h4">You do not have any pets.</Heading>;
  } else {
    body = <ExpenseDashboard />;
  }

  return (
    <AppPageLayout>
      <Stack w={{ md: '4xl' }} spacing={8}>
        {body}
      </Stack>
    </AppPageLayout>
  );
};

export default Dashboard;
