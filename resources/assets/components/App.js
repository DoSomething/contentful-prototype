import React from 'react';
import { Provider } from 'react-redux';
import * as reducers from '../reducers'
import { configureStore, initializeStore } from '../store';

import { Router, Route, useRouterHistory } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import ChromeContainer from '../containers/ChromeContainer';
import FeedContainer from '../containers/FeedContainer';
import ActionPageContainer from '../containers/ActionPageContainer';
import ContentPageContainer from '../containers/ContentPageContainer';
import NotFound from './NotFound';

import observe from '../middleware/analytics';

// Set the application "base name" to /campaigns/:slug so all pages are relative to that.
const basename = window.location.pathname.split('/').slice(0, 3).join('/');

const store = configureStore({...reducers, routing: routerReducer}, window.STATE);
const routerHistory = useRouterHistory(createBrowserHistory);
const history = syncHistoryWithStore(routerHistory({basename}), store);

observe(history, store);

const App = (props) => (
  <Provider store={store}>
    <Router history={history}>
      <Route component={ChromeContainer} onEnter={initializeStore(store)}>
        <Route path="/" component={FeedContainer}/>
        <Route path="/action" component={ActionPageContainer}/>
        <Route path="/pages/:page" component={ContentPageContainer}/>
        <Route path='*' component={NotFound} />
      </Route>
    </Router>
  </Provider>
);


export default App;
