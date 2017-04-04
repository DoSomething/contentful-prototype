import React from 'react';
import FeedEnclosure from './FeedEnclosure';
import NavigationContainer from '../containers/NavigationContainer';
import Affirmation from './Affirmation';

const Chrome = (props) => (
  <div>
    <NavigationContainer />
    <FeedEnclosure>
      {props.hasNewSignup ? <Affirmation /> : null}
      {props.children}
    </FeedEnclosure>
  </div>
);

export default Chrome;
