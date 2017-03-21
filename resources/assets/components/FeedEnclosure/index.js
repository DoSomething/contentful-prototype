import React from 'react';
import './feed-enclosure.scss';

const FeedEnclosure = ({children}) => (
  <div className="feed-enclosure">
    <div className="wrapper">
      {children}
    </div>
  </div>
);

export default FeedEnclosure;
