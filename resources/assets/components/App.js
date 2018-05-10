import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { PuckProvider } from '@dosomething/puck-client';

import { env } from '../helpers';
import graphqlClient from '../graphql';
import { getUserId } from '../selectors/user';
import { initializeStore } from '../store/store';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import CampaignContainer from './Campaign/CampaignContainer';
import GeneralPageContainer from './pages/GeneralPage/GeneralPageContainer';

const App = ({ store, history }) => {
  initializeStore(store);

  return (
    <Provider store={store}>
      <PuckProvider
        source="phoenix-next"
        getUser={() => getUserId(store.getState())}
        history={history}
        puckUrl={env('PUCK_URL')}
      >
        <ApolloProvider client={graphqlClient}>
          <ConnectedRouter history={history}>
            <Switch>
              <Route path="/us/profile" component={ProfilePage} />
              <Route path="/us/campaigns/:slug" component={CampaignContainer} />
              <Route path="/us/:slug" component={GeneralPageContainer} />
            </Switch>
          </ConnectedRouter>
        </ApolloProvider>
      </PuckProvider>
    </Provider>
  );
};

App.propTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default App;
