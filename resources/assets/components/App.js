import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { initializeStore } from '../store';

import { paths } from '../helpers/navigation';
import ChromeContainer from '../containers/ChromeContainer';
import Experience from '../components/Experience';
import FeedContainer from '../containers/FeedContainer';
import ActionPageContainer from '../containers/ActionPageContainer';
import ContentPageContainer from '../containers/ContentPageContainer';
import PitchContainer from '../containers/PitchContainer';
import NotFound from './NotFound';

const wrap = (Container, Component) => props => (
  <Container><Component {...props} /></Container>
);

const experience = component => wrap(Experience, component);
const chrome = component => wrap(ChromeContainer, component);

const App = ({ store, history }) => {
  initializeStore(store);

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          {/* Base user experience */}
          <Route path={paths.community} exact component={chrome(FeedContainer)} />
          <Route path={paths.action} component={chrome(ActionPageContainer)} />
          <Route path={`${paths.pages}:page`} component={chrome(ContentPageContainer)} />
          {/* * */}

          {/* Custom user experiences */}
          <Route path={paths.pitch} component={experience(PitchContainer)} />
          {/* * */}

          <Route component={chrome(NotFound)} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
};

App.propTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default App;
