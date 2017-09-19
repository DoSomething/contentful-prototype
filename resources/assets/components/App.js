import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { PuckProvider } from '@dosomething/puck-client';

import { CampaignContainer } from './Campaign';
import { initializeStore } from '../store';
import { env } from '../helpers';

const App = ({ store, history }) => {
  initializeStore(store);

  return (
    <Provider store={store}>
      <PuckProvider
        source="phoenix-next"
        getUser={() => store.getState().user.id}
        getHistory={() => history}
        puckUrl={env('keen_url')}
      >
        <ConnectedRouter history={history}>
          <Route path="/us/campaigns/:slug" component={CampaignContainer} />
        </ConnectedRouter>
      </PuckProvider>
    </Provider>
  );
};

App.propTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default App;
