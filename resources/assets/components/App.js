import React from 'react';
import { Provider } from 'react-redux';
import * as reducers from '../reducers'
import configureStore from '../store';

import { Router, Route, useRouterHistory } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import Chrome from './Chrome';
import ActivityContainer from '../containers/ActivityContainer';
import ContentPageContainer from '../containers/ContentPageContainer';
import NotFound from './NotFound';

// Set the application "base name" to /campaigns/:slug so all pages are relative to that.
const basename = window.location.pathname.split('/').slice(0, 3).join('/');

const store = configureStore({...reducers, routing: routerReducer}, window.STATE);
const routerHistory = useRouterHistory(createBrowserHistory);
const history = syncHistoryWithStore(routerHistory({basename}), store);

function pageView(path) {
  if (typeof ga === 'undefined') return;

  ga('send', 'pageview', path);
}

pageView(window.location.pathname);
history.listen(({ basename, pathname }) => {
  let path = basename;
  if (pathname) path += pathname;

  pageView(path);
});

const App = (props) => (
  <Provider store={store}>
    <Router history={history}>
      <Route component={Chrome}>
        <Route path="/" component={ActivityContainer}/>
        <Route path="/pages/:page" component={ContentPageContainer}/>
        <Route path='*' component={NotFound} />
      </Route>
    </Router>
  </Provider>
);


export default App;
