import React from 'react';
import PropTypes from 'prop-types';

import editIcon from './editIcon.svg';

const ReviewLink = ({ className, url }) => (
  <a href={url} className={className}>
    <img
      className="post-badge"
      alt="Review this post."
      title="Review this post."
      src={editIcon}
    />
  </a>
);

ReviewLink.propTypes = {
  className: PropTypes.string,
  url: PropTypes.string.isRequired,
};

ReviewLink.defaultProps = {
  className: null,
};

export default ReviewLink;
