import React from 'react';
import PropTypes from 'prop-types';

import editIcon from './edit_icon.svg';

const ReviewLink = ({ className, url }) => (
  <a href={url} className={className}>
    <img
      className="review-icon"
      alt="review and edit post icon"
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
