import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { initializeStore } from '../store';

import { paths } from '../helpers/navigation';
import ChromeContainer from '../containers/ChromeContainer';
import FeedContainer from '../containers/FeedContainer';
import ActionPageContainer from '../containers/ActionPageContainer';
import ContentPageContainer from '../containers/ContentPageContainer';
import NotFound from './NotFound';

const App = ({ store, history }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ChromeContainer onEnter={initializeStore(store)}>
        <Switch>
          <Route path={paths.community} exact component={FeedContainer} />
          <Route path={paths.action} component={ActionPageContainer} />
          <Route path={`${paths.pages}:page`} component={ContentPageContainer} />
          <Route component={NotFound} />
        </Switch>
      </ChromeContainer>
    </ConnectedRouter>
  </Provider>
);

App.propTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default App;
