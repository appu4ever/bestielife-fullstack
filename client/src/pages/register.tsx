/*eslint-disable*/
import { Stack, Heading, Box, Button, Text, Link } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import React from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';

import InputField from '../components/InputField';
import { useRegisterMutation } from '../generated/graphql';
import AuthFormLayout from '../layouts/AuthFormLayout';
import { toErrorMap } from '../utils/toErrorMap';

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const [register] = useRegisterMutation();
  const history = useHistory();
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
            We’re looking for amazing engineers just like you! Become a part of
            our rockstar engineering team and skyrocket your career!
          </Text>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={async (values, { setErrors }) => {
              const response = await register({ variables: values });
              if (response.data?.register.errors) {
                setErrors(toErrorMap(response.data?.register.errors));
              } else if (response.data?.register.user) {
                history.push('/dashboard');
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
                    direction={{ base: 'row', sm: 'row' }}
                    align={'start'}
                    justify={'center'}
                  >
                    <Text
                      color={'gray.500'}
                      fontSize={{ base: 'sm', sm: 'md' }}
                    >
                      Have an account?
                    </Text>
                    <RouterLink to="/login">
                      <Link
                        color={'pink'}
                        mt={2}
                        fontSize={{ base: 'sm', sm: 'md' }}
                      >
                        Sign in here
                      </Link>
                    </RouterLink>
                  </Stack>
                  <Button
                    bg={'blue'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    Register
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
export default Register;
