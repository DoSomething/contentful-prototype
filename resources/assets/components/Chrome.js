import React from 'react';
import FeedEnclosure from './FeedEnclosure';
import NavigationContainer from '../containers/NavigationContainer';
import AffirmationContainer from '../containers/AffirmationContainer';

const Chrome = (props) => (
  <div>
    <AffirmationContainer />
    <NavigationContainer />
    <FeedEnclosure>
      {props.children}
    </FeedEnclosure>
  </div>
);

export default Chrome;
