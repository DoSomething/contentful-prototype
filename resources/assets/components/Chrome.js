import React from 'react';
import FeedEnclosure from './FeedEnclosure';
import NavigationContainer from '../containers/NavigationContainer';
import Affirmation from './Affirmation';

const Chrome = (props) => (
  <div>
    {props.hasNewSignup ? <Affirmation /> : null}
    <NavigationContainer />
    <FeedEnclosure>
      {props.children}
    </FeedEnclosure>
  </div>
);

export default Chrome;
