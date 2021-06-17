/*eslint-disable*/
import React from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Spinner,
} from '@chakra-ui/react';
import { useMeQuery } from './generated/graphql';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Register from './pages/register';
import { Error } from './components/Error';
import AllExpenses from './pages/all-expenses';
interface AppProps {}

const App: React.FC<AppProps> = ({}) => {
  const history = useHistory();
  const location = useLocation();
  const { data, error, loading } = useMeQuery();

  React.useEffect(() => {
    if (data?.me) {
      history.push('/dashboard');
    } else {
      history.replace({
        pathname: '/login',
        state: { next: location.pathname },
      });
    }
  }, [data]);

  if (loading) {
    return (
      <Box w={'100%'} h={'100%'}>
        <Spinner size="lg" />
      </Box>
    );
  }
  if (error) {
    return (
      <Box w={'100%'} h={'100%'}>
        <Error
          title="Authentication Error!"
          description="Error when trying to verify access to page. Please try again."
        />
      </Box>
    );
  }

  return (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="register">
        <Register />
      </Route>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
      <Route path="/all-expenses/:petId">
        <AllExpenses />
      </Route>
    </Switch>
  );
};

export default App;
