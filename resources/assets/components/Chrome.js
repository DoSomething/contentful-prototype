import React from 'react';
import FeedEnclosure from './FeedEnclosure';
import NavigationContainer from '../containers/NavigationContainer';

const Chrome = (props) => (
  <div>
    <NavigationContainer />
    <FeedEnclosure>
      {props.children}
    </FeedEnclosure>
  </div>
);

export default Chrome;
