import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import { Router, Route, Switch } from 'react-router-dom';

import { env } from '../helpers';
import graphqlClient from '../graphql';
import { initializeStore } from '../store/store';
import SiteNavigationContainer from './SiteNavigation/SiteNavigationContainer';

const App = ({ store, history }) => {
  initializeStore(store);

  return (
    <Provider store={store}>
      <ApolloProvider client={graphqlClient(env('GRAPHQL_URL'))}>
        <Router history={history}>
          <Switch>
            <Route path="/" component={SiteNavigationContainer} />
          </Switch>
        </Router>
      </ApolloProvider>
    </Provider>
  );
};

App.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default App;
