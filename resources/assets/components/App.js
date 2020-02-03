import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/react-common';
import { Router, Route, Switch } from 'react-router-dom';

import graphqlClient from '../graphql';
import { env, featureFlag } from '../helpers';
import { initializeStore } from '../store/store';
import HomePage from './pages/HomePage/HomePage';
import BlockPage from './pages/BlockPage/BlockPage';
import CausePage from './pages/CausePage/CausePage';
import NewHomePage from './pages/HomePage/NewHomePage';
import CompanyPage from './pages/CompanyPage/CompanyPage';
import CampaignContainer from './Campaign/CampaignContainer';
import CampaignsPage from './pages/CampaignsPage/CampaignsPage';
import BetaReferralPage from './pages/ReferralPage/Beta/BetaPage';
import CollectionPage from './pages/CollectionPage/CollectionPage';
import AccountContainer from './pages/AccountPage/AccountContainer';
import PageDispatcherContainer from './PageDispatcher/PageDispatcherContainer';
import AlphaReferralPageContainer from './pages/ReferralPage/Alpha/AlphaPageContainer';

const App = ({ store, history }) => {
  initializeStore(store);

  return (
    <Provider store={store}>
      <ApolloProvider client={graphqlClient(env('GRAPHQL_URL'))}>
        <Router history={history}>
          <Switch>
            <Route
              exact
              path="/us"
              component={featureFlag('new_homepage') ? NewHomePage : HomePage}
            />
            <Route path="/us/account" component={AccountContainer} />
            <Route path="/us/blocks/:id" component={BlockPage} />
            <Route exact path="/us/campaigns" component={CampaignsPage} />
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
            <Route
              path="/us/about/:slug"
              render={routeProps => (
                <CompanyPage slug={routeProps.match.params.slug} />
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
    </Provider>
  );
};

App.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default App;
