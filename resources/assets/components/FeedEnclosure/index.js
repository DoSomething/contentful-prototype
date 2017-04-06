import React from 'react';
import { Wrapper } from '../Wrapper';
import './feed-enclosure.scss';

const FeedEnclosure = ({children}) => (
  <div className="feed-enclosure">
    <Wrapper width="feed">
      { children }
    </Wrapper>
  </div>
);

export default FeedEnclosure;
