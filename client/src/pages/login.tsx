/*eslint-disable*/
import React from 'react';
import { Formik, Form } from 'formik';
import { Box, Heading, Link, Stack } from '@chakra-ui/layout';
import { Text, useTheme } from '@chakra-ui/react';
import { Button } from '@chakra-ui/button';
import { useHistory, useLocation, Link as RouterLink } from 'react-router-dom';

import AuthFormLayout from '../layouts/AuthFormLayout';
import InputField from '../components/InputField';
import { MeDocument, MeQuery, useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';

const Login: React.FC<{}> = ({}) => {
  const [login] = useLoginMutation();
  const theme = useTheme();
  const history = useHistory();
  const query = new URLSearchParams(useLocation().search);

  return (
    <AuthFormLayout>
      <Stack
        bg={'gray.50'}
        rounded={'xl'}
        p={{ base: 4, sm: 6, md: 8 }}
        spacing={{ base: 8 }}
        maxW={{ lg: 'lg' }}
      >
        <Stack spacing={4}>
          <Heading
            color={'gray.800'}
            lineHeight={1.1}
            fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
          >
            Welcome back.
          </Heading>
          <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
            Never compromise on your life or your pet's! Login and experience
            the world of BestieLife!
          </Text>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={async (values, { setErrors }) => {
              const response = await login({
                variables: values,
                update: (cache, { data }) => {
                  cache.writeQuery<MeQuery>({
                    query: MeDocument,
                    data: {
                      __typename: 'Query',
                      me: data?.login.user,
                    },
                  });
                },
              });
              if (response.data?.login.errors) {
                setErrors(toErrorMap(response.data?.login.errors));
              } else if (response.data?.login.user) {
                let next = query.get('next');
                if (next) {
                  next === '/'
                    ? history.push('/')
                    : history.push(`/${query.get('next')}`);
                } else {
                  history.push('/dashboard');
                }
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <InputField name="email" placeholder="Email" type="text" />
                <Box mt={3}>
                  <InputField
                    name="password"
                    placeholder="Password"
                    type="password"
                  />
                </Box>
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={{ base: 'center' }}
                    justify={'flex-end'}
                  >
                    <RouterLink to="/forgot-password">
                      <Link
                        color={'blue'}
                        mt={2}
                        fontSize={{ base: 'sm', sm: 'md' }}
                      >
                        Forgot password?
                      </Link>
                    </RouterLink>
                  </Stack>
                  <Stack
                    direction={{ base: 'row', sm: 'row' }}
                    align={'start'}
                    justify={'center'}
                  >
                    <Text
                      color={'gray.500'}
                      fontSize={{ base: 'sm', sm: 'md' }}
                    >
                      New to Bestlife?
                    </Text>
                    <RouterLink to="/register">
                      <Link
                        color={'pink'}
                        mt={2}
                        fontSize={{ base: 'sm', sm: 'md' }}
                      >
                        Register here
                      </Link>
                    </RouterLink>
                  </Stack>
                  <Button
                    bg={'blue'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}
                    isLoading={isSubmitting}
                    type="submit"
                  >
                    Sign in
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Stack>
      </Stack>
    </AuthFormLayout>
  );
};

export default Login;
