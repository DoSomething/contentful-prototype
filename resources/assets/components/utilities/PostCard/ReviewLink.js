import React from 'react';
import PropTypes from 'prop-types';

import editIcon from './editIcon.svg';

const ReviewLink = ({ url }) => (
  <a href={url}>
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
