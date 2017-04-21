import React from 'react';
import Wrapper from '../Wrapper';
import './feed-enclosure.scss';

const FeedEnclosure = ({ children }) => (
  <div className="feed-enclosure">
    <Wrapper width="feed">
      { children }
    </Wrapper>
  </div>
);

FeedEnclosure.propTypes = {
  children: React.PropTypes.node,
};

FeedEnclosure.defaultProps = {
  children: null,
};

export default FeedEnclosure;
