import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/react-common';
import { Router, Route, Switch } from 'react-router-dom';

import graphqlClient from '../graphql';
import { env, featureFlag } from '../helpers';
import { initializeStore } from '../store/store';
import HomePage from './pages/HomePage/HomePage';
import Modal from './utilities/Modal/Modal';
import BlockPage from './pages/BlockPage/BlockPage';
import CausePage from './pages/CausePage/CausePage';
import NewHomePage from './pages/HomePage/NewHomePage';
import CompanyPage from './pages/CompanyPage/CompanyPage';
import CampaignContainer from './Campaign/CampaignContainer';
import BetaReferralPage from './pages/ReferralPage/Beta/BetaPage';
import CollectionPage from './pages/CollectionPage/CollectionPage';
import TypeFormEmbed from './utilities/TypeFormEmbed/TypeFormEmbed';
import DelayedElement from './utilities/DelayedElement/DelayedElement';
import CampaignsIndexPage from './pages/CampaignsPage/CampaignsIndexPage';
import AccountContainer from './pages/AccountPage/Account/AccountContainer';
import PageDispatcherContainer from './PageDispatcher/PageDispatcherContainer';
import DismissableElement from './utilities/DismissableElement/DismissableElement';
import TrafficDistribution from './utilities/TrafficDistribution/TrafficDistribution';
import AlphaReferralPageContainer from './pages/ReferralPage/Alpha/AlphaPageContainer';

const App = ({ store, history, props }) => {
  initializeStore(store);

  return (
    <Provider store={store}>
      <ApolloProvider client={graphqlClient(env('GRAPHQL_URL'))}>
        {props.isAuthenticated ? (
          <TrafficDistribution percentage={5} feature="nps_survey">
            <DismissableElement
              name="nps_survey"
              render={(handleClose, handleComplete) => (
                <DelayedElement delay={60}>
                  <Modal onClose={handleClose} trackingId="SURVEY_MODAL">
                    <TypeFormEmbed
                      displayType="modal"
                      typeformUrl="https://dosomething.typeform.com/to/Bvcwvm"
                      queryParameters={{
                        northstar_id: get(window.AUTH, 'id', null),
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
  props: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
};

App.defaultProps = {
  isAuthenticated: false,
};

export default App;
