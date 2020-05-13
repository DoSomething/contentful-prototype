import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import ErrorBoundary from 'react-error-boundary';
import { ApolloProvider } from '@apollo/react-common';
import { Provider as ReduxProvider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';

import graphqlClient from '../graphql';
import ErrorPage from './pages/ErrorPage';
import { initializeStore } from '../store/store';
import HomePage from './pages/HomePage/HomePage';
import Modal from './utilities/Modal/Modal';
import BlockPage from './pages/BlockPage/BlockPage';
import CausePage from './pages/CausePage/CausePage';
import NewHomePage from './pages/HomePage/NewHomePage';
import CompanyPage from './pages/CompanyPage/CompanyPage';
import CampaignContainer from './Campaign/CampaignContainer';
import { env, featureFlag, buildVoterRegUrl } from '../helpers';
import BetaReferralPage from './pages/ReferralPage/Beta/BetaPage';
import CollectionPage from './pages/CollectionPage/CollectionPage';
import QuizResultPage from './pages/QuizResultPage/QuizResultPage';
import TypeFormEmbed from './utilities/TypeFormEmbed/TypeFormEmbed';
import DelayedElement from './utilities/DelayedElement/DelayedElement';
import SitewideBanner from './utilities/SitewideBanner/SitewideBanner';
import CampaignsIndexPage from './pages/CampaignsPage/CampaignsIndexPage';
import AccountContainer from './pages/AccountPage/Account/AccountContainer';
import PageDispatcherContainer from './PageDispatcher/PageDispatcherContainer';
import DismissableElement from './utilities/DismissableElement/DismissableElement';
import TrafficDistribution from './utilities/TrafficDistribution/TrafficDistribution';
import AlphaReferralPageContainer from './pages/ReferralPage/Alpha/AlphaPageContainer';
import BetaVoterRegistrationDrivePage from './pages/VoterRegistrationDrivePage/Beta/BetaPage';

const App = ({ store, history }) => {
  initializeStore(store);

  return (
    <ReduxProvider store={store}>
      <ErrorBoundary FallbackComponent={ErrorPage}>
        <DismissableElement
          name="sitewide_banner_call_to_action"
          daysToReRender={7}
          context={{ contextSource: 'voter_registration' }}
          render={(handleClose, handleComplete) => (
            <SitewideBanner
              cta="Get Started"
              description="Make your voice heard. Register to vote in less than 2 minutes."
              handleClose={handleClose}
              handleComplete={handleComplete}
              link={buildVoterRegUrl('web', 'hellobar')}
            />
          )}
        />
        <ApolloProvider client={graphqlClient(env('GRAPHQL_URL'))}>
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

              <Route path="/us/quiz-results/:id" component={QuizResultPage} />

              <Route
                path="/us/my-voter-registration-drive"
                component={BetaVoterRegistrationDrivePage}
              />

              <Route
                path="/us/refer-friends"
                component={AlphaReferralPageContainer}
              />

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
