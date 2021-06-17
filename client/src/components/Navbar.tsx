/*eslint-disable*/
import {
  Flex,
  Box,
  useTheme,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Link,
} from '@chakra-ui/react';
import { MdClose, MdMenu } from 'react-icons/md';
import { HamburgerIcon, AddIcon, ArrowRightIcon } from '@chakra-ui/icons';

import { useHistory, Link as RouterLink } from 'react-router-dom';
import React from 'react';
import { useApolloClient } from '@apollo/client';
import Logo from './Logo';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';

const Navbar: React.FC<{}> = ({ children }) => {
  const theme = useTheme();
  const [show, setShow] = React.useState(false);
  const toggleMenu = () => setShow(!show);
  const { data } = useMeQuery();
  const [logout, {}] = useLogoutMutation();
  const history = useHistory();
  const apollo = useApolloClient();
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      // mb={8}
      py={8}
      px={8}
      bg={[theme.colors.green, 'transparent', 'transparent', 'transparent']}
      color={[
        theme.colors.black,
        theme.colors.black,
        theme.colors.white,
        theme.colors.white,
      ]}
    >
      {' '}
      <Flex align="center">
        <Logo />
      </Flex>
      {data?.me ? (
        <Box display={{ base: 'block', md: 'none' }}>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
            />
            <MenuList>
              <RouterLink to="/add-pet">
                <MenuItem icon={<AddIcon />}>
                  <Link>Add a pet</Link>
                </MenuItem>
              </RouterLink>
              <MenuItem
                icon={<ArrowRightIcon />}
                onClick={async () => {
                  logout();
                  await apollo.resetStore();
                  history.push('/login');
                }}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      ) : (
        <Box display={{ base: 'block', md: 'none' }} onClick={toggleMenu}>
          {show ? (
            <MdClose color={theme.colors.blue} />
          ) : (
            <MdMenu color={theme.colors.orange} />
          )}
        </Box>
      )}
      <Box
        display={{ base: show ? 'block' : 'none', md: 'block' }}
        flexBasis={{ base: '100%', md: 'auto' }}
      >
        <Flex
          align={['center', 'center', 'center', 'center']}
          justify={['center', 'space-between', 'flex-end', 'flex-end']}
          direction={['column', 'row', 'row', 'row']}
          pt={[4, 4, 0, 0]}
        >
          {children}
        </Flex>
      </Box>
    </Flex>
  );
};

export default Navbar;
