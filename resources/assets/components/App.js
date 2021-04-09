import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from 'react-error-boundary';
import { ApolloProvider } from '@apollo/react-common';
import { Provider as ReduxProvider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';

import { query } from '../helpers/url';
import graphqlClient from '../graphql';
import ErrorPage from './pages/ErrorPage';
import AuthGate from './utilities/AuthGate';
import Modal from './utilities/Modal/Modal';
import { initializeStore } from '../store/store';
import HomePage from './pages/HomePage/HomePage';
import { env, featureFlag } from '../helpers/env';
import BlockPage from './pages/BlockPage/BlockPage';
import CausePage from './pages/CausePage/CausePage';
import AboutPage from './pages/AboutPage/AboutPage';
import CompanyPage from './pages/CompanyPage/CompanyPage';
import { isAuthenticated, getUserId } from '../helpers/auth';
import CampaignContainer from './Campaign/CampaignContainer';
import BetaReferralPage from './pages/ReferralPage/Beta/BetaPage';
import CollectionPage from './pages/CollectionPage/CollectionPage';
import QuizResultPage from './pages/QuizResultPage/QuizResultPage';
import AccountQuery from './pages/AccountPage/Account/AccountQuery';
import TypeFormEmbed from './utilities/TypeFormEmbed/TypeFormEmbed';
import AlphaReferralPage from './pages/ReferralPage/Alpha/AlphaPage';
import DelayedElement from './utilities/DelayedElement/DelayedElement';
import CampaignsIndexPage from './pages/CampaignsPage/CampaignsIndexPage';
import ShowSubmissionPage from './pages/ShowSubmissionPage/ShowSubmissionPage';
import PageDispatcherContainer from './PageDispatcher/PageDispatcherContainer';
import PopoverDispatcher from './utilities/PopoverDispatcher/PopoverDispatcher';
import DismissableElement from './utilities/DismissableElement/DismissableElement';
import TrafficDistribution from './utilities/TrafficDistribution/TrafficDistribution';
import VoterRegistrationDrivePage from './pages/VoterRegistrationDrivePage/VoterRegistrationDrivePage';
import VoterRegistrationLandingPage from './pages/VoterRegistrationLandingPage/VoterRegistrationLandingPage';
import VoterRegistrationMarketingPage from './pages/VoterRegistrationMarketingPage/VoterRegistrationMarketingPage';

const App = ({ store, history }) => {
  initializeStore(store);

  return (
    <ReduxProvider store={store}>
      <ErrorBoundary FallbackComponent={ErrorPage}>
        <ApolloProvider client={graphqlClient(env('GRAPHQL_URL'))}>
          {query('chromeless') ? (
            /* If we're in "chromeless" mode, open all links in new windows: */
            <base target="_blank" />
          ) : null}

          <PopoverDispatcher />

          {featureFlag('sitewide_nps_survey') && isAuthenticated() ? (
            <TrafficDistribution percentage={5} feature="nps_survey">
              <DismissableElement
                name="nps_survey"
                render={(handleClose, handleComplete) => (
                  <DelayedElement delay={60}>
                    <Modal onClose={handleClose} trackingId="SURVEY_MODAL">
                      <TypeFormEmbed
                        displayType="modal"
                        typeformUrl="https://dosomething.typeform.com/to/Phi9pA"
                        queryParameters={{
                          northstar_id: getUserId(),
                          url: window.location.pathname,
                        }}
                        onSubmit={handleComplete}
                      />
                    </Modal>
                  </DelayedElement>
                )}
              />
            </TrafficDistribution>
          ) : null}

          <Router history={history}>
            <Switch>
              <Route exact path="/us" component={HomePage} />

              <Route
                path="/us/account"
                render={() => (
                  <AuthGate>
                    <AccountQuery />
                  </AuthGate>
                )}
              />

              <Route path="/us/blocks/:id" component={BlockPage} />

              {featureFlag('post_confirmation_page') ? (
                <Route
                  path="/us/posts/:post_id"
                  render={routeProps => (
                    <AuthGate>
                      <ShowSubmissionPage match={routeProps.match} />
                    </AuthGate>
                  )}
                />
              ) : null}

              <Route
                exact
                path="/us/campaigns"
                component={CampaignsIndexPage}
              />

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

              <Route exact path="/us/about" component={AboutPage} />

              <Route
                path="/us/about/:slug"
                render={routeProps => (
                  <CompanyPage slug={routeProps.match.params.slug} />
                )}
              />

              <Route path="/us/join" component={BetaReferralPage} />

              <Route
                path="/us/quiz-results/:id"
                render={routeProps => (
                  <QuizResultPage id={routeProps.match.params.id} />
                )}
              />

              <Route
                path="/us/my-voter-registration-drive"
                component={VoterRegistrationDrivePage}
              />

              <Route
                exact
                path="/us/vote"
                component={VoterRegistrationLandingPage}
              />

              <Route
                path="/us/vote/:slug"
                render={routeProps => (
                  <VoterRegistrationMarketingPage
                    slug={routeProps.match.params.slug}
                  />
                )}
              />

              <Route path="/us/refer-friends" component={AlphaReferralPage} />

              <Route path="/us/:slug" component={PageDispatcherContainer} />
            </Switch>
          </Router>
        </ApolloProvider>
      </ErrorBoundary>
    </ReduxProvider>
  );
};

App.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default App;
