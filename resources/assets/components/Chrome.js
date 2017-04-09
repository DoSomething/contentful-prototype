import React from 'react';
import FeedEnclosure from './FeedEnclosure';
import LedeBanner from './LedeBanner';
import NavigationContainer from '../containers/NavigationContainer';
import AffirmationContainer from '../containers/AffirmationContainer';

const Chrome = (props) => (
  <div>
    <LedeBanner title={props.title} subtitle={props.subtitle} blurb={props.blurb} coverImage={props.coverImage} />
    <AffirmationContainer />
    <NavigationContainer />
    <FeedEnclosure>
      {props.children}
    </FeedEnclosure>
  </div>
);

export default Chrome;
