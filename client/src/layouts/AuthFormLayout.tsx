/*eslint-disable*/
import { Flex, Stack, useBreakpointValue, Box, Image } from '@chakra-ui/react';
import React from 'react';
import Logo from '../components/Logo';

interface AuthFormLayoutProps {}

const AuthFormLayout: React.FC<AuthFormLayoutProps> = ({ children }) => {
  return (
    <>
      <Flex
        as="nav"
        w="100%"
        mb={8}
        p={8}
        bg="transparent"
        // style={{ border: '1px solid black' }}
      >
        <Logo />
      </Flex>

      <Flex
        align="center"
        justify={{ base: 'center', md: 'space-between' }}
        direction={{ base: 'column', md: 'row' }}
        minH="70vh"
        px={8}
        mb={16}
        // style={{ border: '1px solid black' }}
      >
        {' '}
        <Stack
          spacing={4}
          w={{ base: '100%', md: '50%' }}
          align={['center', 'center', 'flex-start', 'flex-start']}
          rounded="1rem"
          shadow={['none', 'none', '2xl']}
        >
          <Image
            src={useBreakpointValue({
              base: `${process.env.PUBLIC_URL}/images/mobile-auth-form.jpeg`,
              md: `${process.env.PUBLIC_URL}/images/desktop-auth-form.jpeg`,
            })}
            rounded="1rem"
            shadow="2xl"
            boxSize="100%"
            objectFit="cover"
          />
        </Stack>
        <Box
          w={{ base: '100%', sm: '100%', md: '40%' }}
          //   d={{ base: 'block', sm: 'block', md: 'none', lg: 'none', xl: 'none' }}
          mb={{ base: 12, md: 0 }}
          //   style={{ border: '1px solid black' }}
        >
          {children}
        </Box>
      </Flex>
    </>
  );
};
export default AuthFormLayout;
