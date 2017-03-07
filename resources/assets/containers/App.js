import React from 'react';
import { Provider } from 'react-redux';
import * as reducers from '../reducers/index'
import configureStore from '../store';

import FeedContainer from '../components/FeedContainer';
import Activity from './Activity';

const store = configureStore({...reducers}, window.STATE);

const App = (props) => (
  <Provider store={store}>
    <FeedContainer>
      <Activity />
    </FeedContainer>
  </Provider>
);

export default App;
