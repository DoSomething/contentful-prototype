import React from 'react';
import { Provider } from 'react-redux';
import * as reducers from '../reducers'
import { configureStore, initializeStore } from '../store';

import { Router, Route } from 'react-router';
import { routerReducer } from 'react-router-redux';
import { init as historyInit } from '../history';

import ChromeContainer from '../containers/ChromeContainer';
import FeedContainer from '../containers/FeedContainer';
import ActionPageContainer from '../containers/ActionPageContainer';
import ContentPageContainer from '../containers/ContentPageContainer';
import NotFound from './NotFound';

import observe from '../middleware/analytics';

const store = configureStore({...reducers, routing: routerReducer}, window.STATE);
const history = historyInit(store);

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
