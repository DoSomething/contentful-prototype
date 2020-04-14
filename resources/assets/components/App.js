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
import BetaReferralPage from './pages/ReferralPage/Beta/BetaPage';
import CollectionPage from './pages/CollectionPage/CollectionPage';
import SitewideBanner from './utilities/SitewideBanner/SitewideBanner';
import CampaignsIndexPage from './pages/CampaignsPage/CampaignsIndexPage';
import AccountContainer from './pages/AccountPage/Account/AccountContainer';
import PageDispatcherContainer from './PageDispatcher/PageDispatcherContainer';
import DismissableElement from './utilities/DismissableElement/DismissableElement';
import AlphaReferralPageContainer from './pages/ReferralPage/Alpha/AlphaPageContainer';
import VoterRegistrationDrivePage from './pages/VoterRegistrationDrivePage/VoterRegistrationDrivePage';

const App = ({ store, history }) => {
  initializeStore(store);

  return (
    <Provider store={store}>
      {featureFlag('sitewide_cta_banner') ? (
        <DismissableElement
          name="sitewide_banner_voter_registration"
          daysToReRender={7}
          context={{ contextSource: 'voter_registration' }}
          render={(handleClose, handleComplete) => (
            <SitewideBanner
              cta="Get Started"
              description="Make your voice heard. Register to vote in less than 2 minutes."
              handleClose={handleClose}
              handleComplete={handleComplete}
              link="https://vote.dosomething.org/?r=source:web,source_details:hellobar"
            />
          )}
        />
      ) : null}
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
            {featureFlag('dynamic_explore_campaigns') ? (
              <Route
                exact
                path="/us/campaigns"
                component={CampaignsIndexPage}
              />
            ) : null}
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
              path="/us/members/:userId/voter-registration-drive"
              render={routeProps => (
                <VoterRegistrationDrivePage
                  userId={routeProps.match.params.userId}
                />
              )}
            />
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
