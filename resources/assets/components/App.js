import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import { initializeStore } from '../store';


import ChromeContainer from '../containers/ChromeContainer';
import FeedContainer from '../containers/FeedContainer';
import ActionPageContainer from '../containers/ActionPageContainer';
import ContentPageContainer from '../containers/ContentPageContainer';
import NotFound from './NotFound';

const App = ({ store, history }) => (
  <Provider store={store}>
    <Router history={history}>
      <Route component={ChromeContainer} onEnter={initializeStore(store)}>
        <Route path="/" component={FeedContainer} />
        <Route path="/action" component={ActionPageContainer} />
        <Route path="/pages/:page" component={ContentPageContainer} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>
);

App.propTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default App;
