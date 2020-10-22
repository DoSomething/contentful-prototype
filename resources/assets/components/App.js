import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import ErrorBoundary from 'react-error-boundary';
import { ApolloProvider } from '@apollo/react-common';
import { Provider as ReduxProvider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';

import graphqlClient from '../graphql';
import ErrorPage from './pages/ErrorPage';
import Modal from './utilities/Modal/Modal';
import { initializeStore } from '../store/store';
import HomePage from './pages/HomePage/HomePage';
import BlockPage from './pages/BlockPage/BlockPage';
import CausePage from './pages/CausePage/CausePage';
import { env, featureFlag, query } from '../helpers';
import CompanyPage from './pages/CompanyPage/CompanyPage';
import CampaignContainer from './Campaign/CampaignContainer';
import { getTrackingSource } from '../helpers/voter-registration';
import BetaReferralPage from './pages/ReferralPage/Beta/BetaPage';
import CollectionPage from './pages/CollectionPage/CollectionPage';
import QuizResultPage from './pages/QuizResultPage/QuizResultPage';
import TypeFormEmbed from './utilities/TypeFormEmbed/TypeFormEmbed';
import AlphaReferralPage from './pages/ReferralPage/Alpha/AlphaPage';
import DelayedElement from './utilities/DelayedElement/DelayedElement';
import CampaignsIndexPage from './pages/CampaignsPage/CampaignsIndexPage';
import AccountContainer from './pages/AccountPage/Account/AccountContainer';
import ShowSubmissionPage from './pages/ShowSubmissionPage/ShowSubmissionPage';
import PageDispatcherContainer from './PageDispatcher/PageDispatcherContainer';
import PopoverDispatcher from './utilities/PopoverDispatcher/PopoverDispatcher';
import DismissableElement from './utilities/DismissableElement/DismissableElement';
import TrafficDistribution from './utilities/TrafficDistribution/TrafficDistribution';
import VoterRegistrationDrivePage from './pages/VoterRegistrationDrivePage/VoterRegistrationDrivePage';

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
          <DismissableElement
            name="sitewide_banner_call_to_action"
            daysToReRender={7}
            context={{ contextSource: 'voter_registration' }}
            render={(handleClose, handleComplete) => (
              <PopoverDispatcher
                cta="Get Started"
                description="Make your voice heard. Register to vote in less than 2 minutes."
                handleClose={handleClose}
                handleComplete={handleComplete}
                link={`https://vote.dosomething.org/?r=${getTrackingSource(
                  'hellobar',
                )}`}
              />
            )}
          />
          {featureFlag('sitewide_nps_survey') &&
          window.location.pathname !== '/us' ? (
            <TrafficDistribution percentage={5} feature="nps_survey">
              <DismissableElement
                name="nps_survey"
                render={(handleClose, handleComplete) => (
                  <DelayedElement delay={30}>
                    <Modal onClose={handleClose} trackingId="SURVEY_MODAL">
                      <TypeFormEmbed
                        displayType="modal"
                        typeformUrl="https://dosomething.typeform.com/to/Phi9pA"
                        queryParameters={{
                          northstar_id: get(window.AUTH, 'id', null),
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

              <Route path="/us/account" component={AccountContainer} />

              <Route path="/us/blocks/:id" component={BlockPage} />

              {featureFlag('post_confirmation_page') ? (
                <Route
                  path="/us/posts/:post_id"
                  component={ShowSubmissionPage}
                />
              ) : null}

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
                path="/us/quiz-results/:id"
                render={routeProps => (
                  <QuizResultPage id={routeProps.match.params.id} />
                )}
              />

              <Route
                path="/us/my-voter-registration-drive"
                component={VoterRegistrationDrivePage}
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
