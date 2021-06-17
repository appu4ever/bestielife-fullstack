/*eslint-disable*/
import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Spinner,
  Stack,
  useTheme,
  VStack,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import React from 'react';
import { useApolloClient } from '@apollo/client';

import Navbar from '../components/Navbar';
import { useLogoutMutation, usePetsQuery } from '../generated/graphql';
import Drawer from '../components/Drawer';
import PetDropdown from '../components/PetDropdown';
import { usePetID } from '../contexts/pet-context';
import SideNavbar from '../components/SideNavbar';

interface AppPageLayoutProps {}

const AppPageLayout: React.FC<AppPageLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const [logout] = useLogoutMutation();
  //@ts-ignore
  const [petId, setPetId, data] = usePetID();

  const history = useHistory();
  const apollo = useApolloClient();

  React.useEffect(() => {
    if (data) {
      !petId ? setPetId(data.pets[data.pets.length - 1].id) : setPetId(petId);
    }
  }, [petId, data.pets]);
  // console.log(petId, data);

  return (
    <Flex minH={'100vh'} direction="column" bg={'whiteAlpha.200'}>
      <Navbar>
        <Stack
          direction="row"
          spacing={4}
          display={{ base: 'none', md: 'block' }}
        >
          <Drawer />
          <Button
            rightIcon={<ArrowForwardIcon />}
            colorScheme={theme.colors.blue}
            color={theme.colors.blue}
            variant="outline"
            onClick={async () => {
              await logout();
              await apollo.resetStore();
              history.push('/login');
            }}
            fontSize={'sm'}
          >
            Logout
          </Button>
        </Stack>
      </Navbar>
      <Flex>
        <SideNavbar />
        <VStack p={4} w="full">
          <Flex w={'100%'}>
            <Box display={{ base: 'none', md: 'block' }} ml={'auto'}>
              <PetDropdown />
            </Box>
          </Flex>
          {children}
        </VStack>
      </Flex>
    </Flex>
  );
};

export default AppPageLayout;
