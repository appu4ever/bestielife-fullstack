import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Spinner,
} from '@chakra-ui/react';
import React from 'react';
import { Redirect, Route } from 'react-router';
import { useMeQuery } from '../generated/graphql';

interface PrivateRouteProps {
  path: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, ...rest }) => {
  const { data, loading, error } = useMeQuery();
  if (loading) {
    return (
      <Box w={'100%'} h={'100%'}>
        <Spinner size="lg" />
      </Box>
    );
  }
  if (error) {
    return (
      <Alert
        status="error"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Authentication Error!
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          Error when trying to verify access to page. Please try again.
        </AlertDescription>
      </Alert>
    );
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
        data && data.me ? (
          children
        ) : (
          <Redirect to={{ pathname: '/login', state: { next: location } }} />
        )
      }
    />
  );
};
export default PrivateRoute;
