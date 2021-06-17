/*eslint-disable*/
import {
  Flex,
  Spacer,
  Heading,
  Image,
  useTheme,
  Link,
  Box,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';

interface LogoProps {}

const Logo: React.FC<LogoProps> = ({}) => {
  const theme = useTheme();
  return (
    <Flex
      w={{ base: '100px', md: '130px' }}
      align="center"
      justify="space-between"
    >
      <Box width={{ base: '15px', md: '20px' }}>
        <Image
          src={process.env.PUBLIC_URL + '/images/paw.svg'}
          width={'100%'}
          height={'100%'}
        />
      </Box>

      <Spacer />
      <Heading
        fontSize={['lg', '2xl', '2xl', '2xl']}
        color={{ base: theme.colors.blue }}
      >
        <RouterLink to="/">BestieLife</RouterLink>
        {/* <Link style={{ textDecoration: 'none' }}>BestieLife</Link> */}
        {/* </RouterLink> */}
      </Heading>
    </Flex>
  );
};
export default Logo;
