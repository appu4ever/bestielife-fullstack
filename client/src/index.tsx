import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from './utils/createApolloClient';
import { PetIDProvider } from './contexts/pet-context';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import Fonts from './Fonts';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <PetIDProvider>
          <ChakraProvider theme={theme}>
            <Fonts />
            <App />
          </ChakraProvider>
        </PetIDProvider>
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
