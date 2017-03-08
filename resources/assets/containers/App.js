import React from 'react';
import { Provider } from 'react-redux';
import * as reducers from '../reducers'
import configureStore from '../store';

import { Router, Route, useRouterHistory } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import Chrome from './Chrome';
import Activity from './Activity';
import ExamplePage from './ExamplePage';
import NotFound from './NotFound';

// Set the application "base name" to /campaigns/:slug so all pages are relative to that.
const basename = window.location.pathname.split('/').slice(0, 3).join('/');

const ititialState = window.STATE;
ititialState.blocks = [];

const store = configureStore({...reducers, routing: routerReducer}, ititialState);
const routerHistory = useRouterHistory(createBrowserHistory);
const history = syncHistoryWithStore(routerHistory({basename}), store);

const App = (props) => (
  <Provider store={store}>
    <Router history={history}>
      <Route component={Chrome}>
        <Route path="/" component={Activity}/>
        <Route path="faq" component={ExamplePage}/>
        <Route path='*' component={NotFound} />
      </Route>
    </Router>
  </Provider>
);


export default App;
