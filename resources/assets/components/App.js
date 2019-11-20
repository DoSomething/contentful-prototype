import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/react-common';
import { Router, Route, Switch } from 'react-router-dom';
import { PuckProvider } from '@dosomething/puck-client';

import { env } from '../helpers';
import graphqlClient from '../graphql';
import { initializeStore } from '../store/store';
import HomePage from './pages/HomePage/HomePage';
import BlockPage from './pages/BlockPage/BlockPage';
import CausePage from './pages/CausePage/CausePage';
import CampaignContainer from './Campaign/CampaignContainer';
import { getUserId, isAuthenticated } from '../selectors/user';
import BetaReferralPage from './pages/ReferralPage/Beta/BetaPage';
import CollectionPage from './pages/CollectionPage/CollectionPage';
import AccountContainer from './pages/AccountPage/AccountContainer';
import PageDispatcherContainer from './PageDispatcher/PageDispatcherContainer';
import AlphaReferralPageContainer from './pages/ReferralPage/Alpha/AlphaPageContainer';

const App = ({ store, history }) => {
  initializeStore(store);

  const state = store.getState();

  return (
    <Provider store={store}>
      <PuckProvider
        source="phoenix-next"
        getUser={() => getUserId(state)}
        isAuthenticated={() => isAuthenticated(state)}
        history={history}
        puckUrl={env('PUCK_URL')}
      >
        <ApolloProvider client={graphqlClient(env('GRAPHQL_URL'))}>
          <Router history={history}>
            <Switch>
              <Route exact path="/us" component={HomePage} />
              <Route path="/us/account" component={AccountContainer} />
              <Route path="/us/blocks/:id" component={BlockPage} />
              <Route path="/us/campaigns/:slug" component={CampaignContainer} />
              <Route
                path="/us/causes/:slug"
                render={routeProps => (
                  <CausePage slug={routeProps.match.params.slug} />
                )}
              />
              <Route
                path="/us/collections/:slug"
                render={routeProps => (
                  <CollectionPage slug={routeProps.match.params.slug} />
                )}
              />
              <Route path="/us/join" component={BetaReferralPage} />
              <Route
                path="/us/refer-friends"
                component={AlphaReferralPageContainer}
              />
              <Route path="/us/:slug" component={PageDispatcherContainer} />
            </Switch>
          </Router>
        </ApolloProvider>
      </PuckProvider>
    </Provider>
  );
};

App.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default App;
