/*eslint-disable*/
import React from 'react';
import { Link, Flex } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

interface MenuItemsProps {
  isLast?: boolean;
  to: any;
  linkStyles?: {};
}

const MenuItems: React.FC<MenuItemsProps> = ({
  children,
  isLast,
  to = '/',
  linkStyles,
  ...rest
}) => {
  return (
    <Flex
      mb={{ base: isLast ? 0 : 8, sm: 0 }}
      mr={{ base: 0, sm: isLast ? 0 : 8 }}
      {...rest}
      fontWeight={['normal', 'normal', 'extrabold', 'extrabold']}
    >
      <RouterLink to={to}>
        <Link style={{ textDecoration: 'none' }} {...linkStyles}>
          {children}
        </Link>
      </RouterLink>
    </Flex>
  );
};

export default MenuItems;
