/*eslint-disable*/
import React from 'react';
import { Flex, Icon, Stack, useTheme, Text } from '@chakra-ui/react';
import { MdDashboard, MdMonetizationOn, MdRestaurant } from 'react-icons/md';

import MenuItems from './MenuItems';
import { usePetID } from '../contexts/pet-context';

interface SideNavbarProps {}

const SideNavbar: React.FC<SideNavbarProps> = ({}) => {
  const theme = useTheme();
  //@ts-ignore

  const [petId, setPetId] = usePetID();
  return (
    <Flex
      // style={{ border: '1px solid black' }}
      // flex={1}
      as="nav"
      align="flex-start"
      justify="space-between"
      wrap="wrap"
      // bg={theme.colors.blue}
      borderRight="1px"
      borderColor="gray.200"
      color={'gray.500'}
      p={8}
      // style={{ border: '1px solid red' }}
    >
      <Stack
        spacing={10}
        justify={{ base: 'space-around', md: 'center' }}
        direction={{ base: 'row', md: 'column' }}
        // style={{ border: '1px solid red' }}
        alignSelf={['center', 'flex-start', 'flex-start', 'flex-start']}
        align={['center', 'flex-start', 'flex-start', 'flex-start']}
        width={{ base: '100%' }}
        marginTop={{ md: '50px' }}
      >
        <MenuItems
          to={{ pathname: '/dashboard' }}
          linkStyles={{ display: 'flex' }}
          isLast={true}
        >
          <Icon
            as={MdDashboard}
            width={{ base: 8, md: 6 }}
            height={{ base: 8, md: 6 }}
            color={theme.colors.green}
          />
          <Text ml={3} display={['none', 'block', 'block', 'block']}>
            Dashboard
          </Text>
        </MenuItems>
        <MenuItems
          to="/expenses"
          linkStyles={{ display: 'flex' }}
          isLast={true}
        >
          <Icon
            as={MdMonetizationOn}
            width={{ base: 8, md: 6 }}
            height={{ base: 8, md: 6 }}
            color={theme.colors.green}
          />
          <Text ml={3} display={['none', 'block', 'block', 'block']}>
            Expenses
          </Text>
        </MenuItems>
        <MenuItems
          to="/find-restaurant"
          linkStyles={{ display: 'flex' }}
          isLast={true}
        >
          <Icon
            as={MdRestaurant}
            width={{ base: 8, md: 6 }}
            height={{ base: 8, md: 6 }}
            color={theme.colors.green}
          />
          <Text ml={3} display={['none', 'block', 'block', 'block']}>
            Find restaurants
          </Text>
        </MenuItems>
      </Stack>
    </Flex>
  );
};
export default SideNavbar;
