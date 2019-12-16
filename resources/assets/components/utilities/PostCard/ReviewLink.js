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
  url: PropTypes.string.isRequired,
};

export default ReviewLink;
