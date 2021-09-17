import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import HttpsRedirect from 'react-https-redirect';
import reportWebVitals from './reportWebVitals';
import configureStore, { history } from './store/_store';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import App from './App.jsx';

import './index.less';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = configureStore();

const client = new ApolloClient({
  uri: 'https://pangaea-interviews.vercel.app/api/graphql',
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <HttpsRedirect>
        <App history={history} />
      </HttpsRedirect>
    </Provider>
  </ApolloProvider>, document.getElementById('root'));

reportWebVitals();
