import React from 'react';
import './feed-container.scss';

const FeedContainer = ({children}) => (
  <div className="feed-container">
    <div className="wrapper">
      {children}
    </div>
  </div>
);

export default FeedContainer;
